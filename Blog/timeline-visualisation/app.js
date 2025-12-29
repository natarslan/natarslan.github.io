// Global state
let data = [];
let filteredData = [];
let currentView = 'timeline';
let focusOptionsPopulated = false;

// Parse year strings (handles BCE and ranges)
function parseYear(yearStr) {
    if (!yearStr) return null;
    yearStr = yearStr.toString().trim();
    
    if (yearStr.includes('BCE')) {
        return -parseInt(yearStr.replace('BCE', '').trim());
    }
    if (yearStr.toLowerCase() === 'present') {
        return new Date().getFullYear();
    }
    return parseInt(yearStr);
}

// Format year for display
function formatYear(yearStr) {
    if (!yearStr) return '';
    if (yearStr.toString().toLowerCase() === 'present') return 'Present';
    const year = parseYear(yearStr);
    if (year < 0) return `${Math.abs(year)} BCE`;
    return year.toString();
}

// Focus tag utilities
function getFocusTokens(str) {
    return (str || '')
        .toLowerCase()
        .split(/[;,]/)
        .map(t => t.trim())
        .filter(t => /^[a-z0-9-]{1,30}$/.test(t));
}

// Get year range display
function getYearRange(item) {
    const start = formatYear(item.year_start);
    const end = formatYear(item.year_end);
    if (start && end && start !== end) {
        return `${start} - ${end}`;
    }
    return start || end || 'Unknown';
}

// Load CSV data
async function loadData() {
    try {
        const response = await fetch('database.csv');
        const text = await response.text();
        data = parseCSV(text);
        filteredData = [...data];
        console.log(`Loaded ${data.length} entries`);
        renderCurrentView();
        populateFocusFilters();
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('main-content').innerHTML = `
            <div class="empty-state">
                <h3>Error loading data</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Parse CSV
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
        // Handle quoted fields that may contain commas
        const values = [];
        let currentValue = '';
        let insideQuotes = false;
        
        for (let char of line) {
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());
        
        const item = {};
        headers.forEach((header, index) => {
            item[header.trim()] = values[index] || '';
        });
        
        return item;
    });
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
        
        currentView = btn.dataset.view;
        document.getElementById(`${currentView}-view`).classList.add('active');
        
        renderCurrentView();
    });
});

function renderCurrentView() {
    switch(currentView) {
        case 'timeline':
            renderTimeline();
            break;
        case 'network':
            renderNetwork();
            break;
        case 'table':
            renderTable();
            break;
        case 'tag-explorer':
            renderTagExplorer();
            break;
        case 'search':
            setupSearch();
            break;
    }
}

// TIMELINE VIEW
function renderTimeline() {
    const typeFilter = document.getElementById('timeline-type-filter').value;
    const eraFilter = document.getElementById('timeline-era-filter').value;
    const focusFilter = document.getElementById('timeline-focus-filter')?.value || 'all';
    
    let filtered = [...data];
    
    if (typeFilter !== 'all') {
        filtered = filtered.filter(item => item.type === typeFilter);
    }
    
    if (eraFilter !== 'all') {
        filtered = filtered.filter(item => {
            const year = parseYear(item.year_start);
            if (year === null) return false;
            
            switch(eraFilter) {
                case 'ancient': return year < 500;
                case 'medieval': return year >= 500 && year < 1400;
                case 'early-modern': return year >= 1400 && year < 1800;
                case 'modern': return year >= 1800 && year < 1950;
                case 'contemporary': return year >= 1950;
                default: return true;
            }
        });
    }
    
    if (focusFilter !== 'all') {
        const fval = focusFilter.toLowerCase();
        filtered = filtered.filter(item => getFocusTokens(item.focus_tags).includes(fval));
    }

    // Sort by year
    filtered.sort((a, b) => {
        const yearA = parseYear(a.year_start) || 0;
        const yearB = parseYear(b.year_start) || 0;
        return yearA - yearB;
    });
    
    const container = document.getElementById('timeline-container');
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No entries match your filters</h3></div>';
        return;
    }
    
    container.innerHTML = filtered.map(item => `
        <div class="timeline-item" data-id="${item.id}">
            <div class="timeline-date">${formatYear(item.year_start)}</div>
            <div class="timeline-content">
                <span class="type-badge type-${item.type}">${item.type}</span>
                <h3>${item.name}</h3>
                <p>${item.description.substring(0, 200)}${item.description.length > 200 ? '...' : ''}</p>
                ${item.key_works ? `<p><strong>Key Works:</strong> ${item.key_works}</p>` : ''}
                <div class="tags">
                    ${item.tags ? item.tags.split(';').map(tag => 
                        `<span class="tag">#${tag.trim()}</span>`
                    ).join('') : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            showDetail(item.dataset.id);
        });
    });
}

// Setup timeline filters
document.getElementById('timeline-type-filter')?.addEventListener('change', renderTimeline);
document.getElementById('timeline-era-filter')?.addEventListener('change', renderTimeline);
document.getElementById('timeline-focus-filter')?.addEventListener('change', renderTimeline);

// NETWORK VIEW
let networkCanvas, networkCtx, networkData, draggedNode, isDragging;
let cameraX = 0, cameraY = 0, cameraZoom = 1;
let lastMouseX, lastMouseY;
let selectedNodeId = null;
let networkFilters = { person: true, framework: true, concept: true, work: true, event: true };
let hoveredNodeId = null;
let lastSearchResults = [];
let lastSearchQuery = '';

function renderNetwork() {
    networkCanvas = document.getElementById('network-canvas');
    if (!networkCanvas) return;
    
    networkCanvas.width = networkCanvas.offsetWidth;
    networkCanvas.height = networkCanvas.offsetHeight;
    networkCtx = networkCanvas.getContext('2d');
    
    prepareNetworkData();
    drawNetwork();
    setupNetworkInteraction();
}

function prepareNetworkData() {
    networkData = {
        nodes: [],
        edges: []
    };
    
    // Create nodes
    data.forEach((item, index) => {
        networkData.nodes.push({
            id: item.id,
            name: item.name,
            type: item.type,
            x: Math.random() * 800 - 400,
            y: Math.random() * 600 - 300,
            vx: 0,
            vy: 0,
            tags: item.tags ? item.tags.split(';').map(t => t.trim()) : []
        });
    });
    
    // Create edges based on related_to field
    data.forEach(item => {
        if (item.related_to) {
            const relatedIds = item.related_to.split(';').map(id => id.trim());
            relatedIds.forEach(targetId => {
                if (targetId) {
                    networkData.edges.push({
                        source: item.id,
                        target: targetId
                    });
                }
            });
        }
    });
    
    // Simple force layout
    for (let i = 0; i < 100; i++) {
        applyForces();
    }
}

function applyForces() {
    const nodes = networkData.nodes;
    const edges = networkData.edges;
    
    // Repulsion between nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 1000 / (dist * dist);
            
            nodes[i].vx -= (dx / dist) * force;
            nodes[i].vy -= (dy / dist) * force;
            nodes[j].vx += (dx / dist) * force;
            nodes[j].vy += (dy / dist) * force;
        }
    }
    
    // Attraction along edges
    edges.forEach(edge => {
        const source = nodes.find(n => n.id === edge.source);
        const target = nodes.find(n => n.id === edge.target);
        
        if (source && target) {
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = dist * 0.01;
            
            source.vx += (dx / dist) * force;
            source.vy += (dy / dist) * force;
            target.vx -= (dx / dist) * force;
            target.vy -= (dy / dist) * force;
        }
    });
    
    // Update positions with damping
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.8;
        node.vy *= 0.8;
    });
}

function drawNetwork() {
    if (!networkCtx) return;

    const ctx = networkCtx;
    const canvas = networkCanvas;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(canvas.width / 2 + cameraX, canvas.height / 2 + cameraY);
    ctx.scale(cameraZoom, cameraZoom);
    
    // Determine visibility by type
    const isTypeVisible = (type) => networkFilters[type] !== false;

    // Build neighbor set if a node is selected or hovered
    const neighborSet = new Set();
    const focusId = selectedNodeId || hoveredNodeId || null;
    if (focusId) {
        neighborSet.add(focusId);
        networkData.edges.forEach(edge => {
            if (edge.source === focusId) neighborSet.add(edge.target);
            if (edge.target === focusId) neighborSet.add(edge.source);
        });
    }

    // Focus filter (by focus_tags)
    const focusSelectEl = document.getElementById('network-focus-filter');
    const focusVal = (focusSelectEl?.value || 'all').toLowerCase();
    const nodeMatchesFocus = (node) => {
        if (focusVal === 'all') return true;
        const item = data.find(d => d.id === node.id);
        return getFocusTokens(item?.focus_tags).includes(focusVal);
    };

    // Draw edges (in focus mode, draw only active edges)
    ctx.lineWidth = 1 / cameraZoom;
    networkData.edges.forEach(edge => {
        const source = networkData.nodes.find(n => n.id === edge.source);
        const target = networkData.nodes.find(n => n.id === edge.target);
        if (!source || !target) return;
        if (!isTypeVisible(source.type) || !isTypeVisible(target.type)) return;
        if (!nodeMatchesFocus(source) || !nodeMatchesFocus(target)) return;

        const related = focusId ? (neighborSet.has(source.id) && neighborSet.has(target.id)) : true;
        if (!related) return; // hide unrelated edges when a node is focused
        ctx.strokeStyle = '#bbb';
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
    });
    
    // Draw nodes
    const tagHighlight = document.getElementById('network-tag-highlight')?.value.toLowerCase();
    
    networkData.nodes.forEach(node => {
        if (!isTypeVisible(node.type)) return;
        if (!nodeMatchesFocus(node)) return;
        let color;
        switch(node.type) {
            case 'person': color = '#667eea'; break;
            case 'framework': color = '#f093fb'; break;
            case 'concept': color = '#4facfe'; break;
            case 'work': color = '#2ecc71'; break;
            case 'event': color = '#ffa500'; break;
            default: color = '#999';
        }
        
        const isHighlighted = tagHighlight && node.tags.some(t => 
            t.toLowerCase().includes(tagHighlight)
        );
        const isRelated = focusId ? (node.id === focusId || neighborSet.has(node.id)) : false;
        const dimmed = selectedNodeId ? !isRelated : false;
        
        if (isHighlighted) {
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 12 / cameraZoom, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.fillStyle = dimmed ? 'rgba(153,153,153,0.08)' : color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8 / cameraZoom, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw label for highlighted, dragged, selected/hover-related nodes
        if (isHighlighted || node === draggedNode || isRelated) {
            ctx.fillStyle = '#333';
            ctx.font = `${12 / cameraZoom}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(node.name, node.x, node.y - 15 / cameraZoom);
        }
    });
    
    ctx.restore();
}

function setupNetworkInteraction() {
    const canvas = networkCanvas;
    
    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left - canvas.width / 2 - cameraX) / cameraZoom;
        const mouseY = (e.clientY - rect.top - canvas.height / 2 - cameraY) / cameraZoom;

        draggedNode = networkData.nodes.find(node => {
            const dx = node.x - mouseX;
            const dy = node.y - mouseY;
            return Math.sqrt(dx * dx + dy * dy) < 10 / cameraZoom;
        });

        if (draggedNode) {
            isDragging = true;
            // Stick selection to the node as soon as user grabs it
            selectedNodeId = draggedNode.id;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            drawNetwork();
        }
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isDragging && draggedNode) {
            const rect = canvas.getBoundingClientRect();
            const dx = (e.clientX - lastMouseX) / cameraZoom;
            const dy = (e.clientY - lastMouseY) / cameraZoom;

            draggedNode.x += dx;
            draggedNode.y += dy;

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            drawNetwork();
        } else if (!isDragging) {
            // Pan camera
            if (e.buttons === 1) {
                cameraX += e.movementX;
                cameraY += e.movementY;
                drawNetwork();
            }
            // Hover highlight (no button pressed)
            if (e.buttons === 0) {
                const rect = canvas.getBoundingClientRect();
                const mx = (e.clientX - rect.left - canvas.width / 2 - cameraX) / cameraZoom;
                const my = (e.clientY - rect.top - canvas.height / 2 - cameraY) / cameraZoom;
                const over = networkData.nodes.find(node => {
                    const dx = node.x - mx;
                    const dy = node.y - my;
                    return Math.sqrt(dx * dx + dy * dy) < 10 / cameraZoom;
                });
                const newHover = over ? over.id : null;
                if (newHover !== hoveredNodeId) {
                    hoveredNodeId = newHover;
                    drawNetwork();
                }
            }
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        draggedNode = null;
    });
    
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        cameraZoom *= zoomFactor;
        cameraZoom = Math.max(0.1, Math.min(5, cameraZoom));
        drawNetwork();
    });
    
    canvas.addEventListener('click', (e) => {
        if (!isDragging) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left - canvas.width / 2 - cameraX) / cameraZoom;
            const mouseY = (e.clientY - rect.top - canvas.height / 2 - cameraY) / cameraZoom;
            
            const clickedNode = networkData.nodes.find(node => {
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                return Math.sqrt(dx * dx + dy * dy) < 10 / cameraZoom;
            });
            
            if (clickedNode) {
                // Toggle selection if clicking same node
                selectedNodeId = (selectedNodeId === clickedNode.id) ? null : clickedNode.id;
                drawNetwork();
                // Also open detail modal
                showDetail(clickedNode.id);
            } else {
                // Clicked on empty space clears selection
                if (selectedNodeId) {
                    selectedNodeId = null;
                    drawNetwork();
                }
            }
        }
    });
    
    document.getElementById('reset-network')?.addEventListener('click', () => {
        cameraX = 0;
        cameraY = 0;
        cameraZoom = 1;
        selectedNodeId = null;
        hoveredNodeId = null;
        const tagInput = document.getElementById('network-tag-highlight');
        if (tagInput) tagInput.value = '';
        const focusSel = document.getElementById('network-focus-filter');
        if (focusSel) focusSel.value = 'all';
        // Ensure type toggles are on
        const ids = ['filter-person','filter-framework','filter-concept','filter-work','filter-event'];
        ids.forEach(id => { const el = document.getElementById(id); if (el) { el.checked = true; networkFilters[el.id.replace('filter-','')] = true; }});
        drawNetwork();
    });
    
    document.getElementById('network-tag-highlight')?.addEventListener('input', drawNetwork);
    document.getElementById('filter-person')?.addEventListener('change', (e) => { networkFilters.person = e.target.checked; drawNetwork(); });
    document.getElementById('filter-framework')?.addEventListener('change', (e) => { networkFilters.framework = e.target.checked; drawNetwork(); });
    document.getElementById('filter-concept')?.addEventListener('change', (e) => { networkFilters.concept = e.target.checked; drawNetwork(); });
    document.getElementById('filter-work')?.addEventListener('change', (e) => { networkFilters.work = e.target.checked; drawNetwork(); });
    document.getElementById('filter-event')?.addEventListener('change', (e) => { networkFilters.event = e.target.checked; drawNetwork(); });
    document.getElementById('network-focus-filter')?.addEventListener('change', drawNetwork);

    // Copy network as Markdown
    document.getElementById('copy-network-md')?.addEventListener('click', () => {
        const id = selectedNodeId || hoveredNodeId;
        if (!id) { alert('Select or hover a node to export.'); return; }
        const md = buildMarkdownForNode(id);
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(md).then(() => alert('Copied network to clipboard!'))
                .catch(() => { prompt('Copy the network markdown:', md); });
        } else {
            prompt('Copy the network markdown:', md);
        }
    });
}

// Build Obsidian-style Markdown for selected node ego-network
function buildMarkdownForNode(id) {
    const nodes = networkData.nodes;
    const edges = networkData.edges;
    const item = data.find(d => d.id === id);
    const node = nodes.find(n => n.id === id);
    if (!node || !item) return '';

    // Collect neighbors
    const neighborIds = new Set();
    edges.forEach(e => { if (e.source === id) neighborIds.add(e.target); if (e.target === id) neighborIds.add(e.source); });
    const neighbors = [...neighborIds].map(nid => nodes.find(n => n.id === nid)).filter(Boolean);

    // Group neighbors by type
    const groups = { person: [], framework: [], concept: [] };
    neighbors.forEach(n => groups[n.type]?.push(n));

    // Build tags from tags + focus_tags
    const mdTags = [];
    if (item.tags) mdTags.push(...item.tags.split(';').map(t => t.trim()).filter(t => /^[a-z0-9-]{1,40}$/i.test(t)).map(t => `#${t}`));
    if (item.focus_tags) item.focus_tags.split(/[;,]/).forEach(t => { t=t.trim(); if (t && /^[a-z0-9-]{1,30}$/i.test(t)) mdTags.push(`#${t}`); });

    const header = `# [[${item.name}]] (${node.type})`;
    const meta = [
        item.primary_field ? `- Field: ${item.primary_field}` : null,
        item.key_contributions ? `- Key: ${item.key_contributions}` : null,
        item.relevance_to_phd ? `- Relevance: ${item.relevance_to_phd}` : null,
        mdTags.length ? `- Tags: ${mdTags.join(' ')}` : null
    ].filter(Boolean).join('\n');

    const list = (title, arr) => arr.length ? `\n## ${title}\n` + arr.map(n => {
        const it = data.find(d => d.id === n.id);
        const nTags = [];
        if (it?.tags) nTags.push(...it.tags.split(';').slice(0,3).map(s=>s.trim()).filter(s=>/^[a-z0-9-]{1,40}$/i.test(s)).map(t => `#${t}`));
        if (it?.focus_tags) it.focus_tags.split(/[;,]/).slice(0,3).forEach(t => { t=t.trim(); if (t && /^[a-z0-9-]{1,30}$/i.test(t)) nTags.push(`#${t}`); });
        const tagStr = nTags.length ? ` (${nTags.join(' ')})` : '';
        return `- [[${n.name}]]${tagStr}`;
    }).join('\n') : '';

    return [header, meta, list('People', groups.person), list('Frameworks', groups.framework), list('Concepts', groups.concept)].filter(Boolean).join('\n\n') + '\n';
}

// TABLE VIEW
function renderTable() {
    const tbody = document.getElementById('table-body');
    const searchTerm = document.getElementById('table-search')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('table-type-filter')?.value || 'all';
    const sortBy = document.getElementById('table-sort')?.value || 'year_start';
    
    let filtered = [...data];
    
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            (item.tags && item.tags.toLowerCase().includes(searchTerm))
        );
    }
    
    if (typeFilter !== 'all') {
        filtered = filtered.filter(item => item.type === typeFilter);
    }
    
    filtered.sort((a, b) => {
        if (sortBy === 'year_start') {
            return (parseYear(a.year_start) || 0) - (parseYear(b.year_start) || 0);
        } else if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'type') {
            return a.type.localeCompare(b.type);
        }
        return 0;
    });
    
    tbody.innerHTML = filtered.map(item => `
        <tr data-id="${item.id}">
            <td><strong>${item.name}</strong></td>
            <td><span class="type-badge type-${item.type}">${item.type}</span></td>
            <td>${getYearRange(item)}</td>
            <td>${item.description.substring(0, 150)}${item.description.length > 150 ? '...' : ''}</td>
            <td>
                ${item.tags ? item.tags.split(';').slice(0, 3).map(tag => 
                    `<span class="tag">#${tag.trim()}</span>`
                ).join('') : ''}
            </td>
            <td>${item.key_works || '-'}</td>
        </tr>
    `).join('');
    
    tbody.querySelectorAll('tr').forEach(row => {
        row.addEventListener('click', () => {
            showDetail(row.dataset.id);
        });
    });
}

// Setup table controls
document.getElementById('table-search')?.addEventListener('input', renderTable);
document.getElementById('table-type-filter')?.addEventListener('change', renderTable);
document.getElementById('table-sort')?.addEventListener('change', renderTable);

// TAG EXPLORER VIEW
function renderTagExplorer() {
    const tagCloud = document.getElementById('tag-cloud');
    const tagSearch = document.getElementById('tag-search')?.value.toLowerCase() || '';
    
    // Collect all tags
    const tagCounts = {};
    data.forEach(item => {
        if (item.tags) {
            item.tags.split(';').forEach(tag => {
                const cleanTag = tag.trim();
                tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
            });
        }
    });
    
    let tags = Object.entries(tagCounts).map(([tag, count]) => ({ tag, count }));
    
    if (tagSearch) {
        tags = tags.filter(t => t.tag.toLowerCase().includes(tagSearch));
    }
    
    tags.sort((a, b) => b.count - a.count);
    
    // Calculate tag sizes
    const maxCount = Math.max(...tags.map(t => t.count));
    
    tagCloud.innerHTML = tags.map(({ tag, count }) => {
        const size = Math.ceil((count / maxCount) * 5);
        return `<div class="tag-item tag-size-${size}" data-tag="${tag}">
            #${tag} (${count})
        </div>`;
    }).join('');
    
    tagCloud.querySelectorAll('.tag-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.tag-item').forEach(t => t.classList.remove('active'));
            item.classList.add('active');
            showTagEntries(item.dataset.tag);
        });
    });
}

function showTagEntries(tag) {
    const container = document.getElementById('tag-entries');
    const entries = data.filter(item => 
        item.tags && item.tags.split(';').map(t => t.trim()).includes(tag)
    );
    
    container.innerHTML = `
        <h3>#${tag} (${entries.length} entries)</h3>
        ${entries.map(item => `
            <div class="entry-card" data-id="${item.id}">
                <h4>${item.name}</h4>
                <span class="type-badge type-${item.type}">${item.type}</span>
                <p>${item.description.substring(0, 100)}...</p>
            </div>
        `).join('')}
    `;
    
    container.querySelectorAll('.entry-card').forEach(card => {
        card.addEventListener('click', () => {
            showDetail(card.dataset.id);
        });
    });
}

document.getElementById('tag-search')?.addEventListener('input', renderTagExplorer);

// SEARCH VIEW
function setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('main-search');
    const modeSelect = document.getElementById('search-mode');
    const exportBtn = document.getElementById('search-export-md');
    const focusSelect = document.getElementById('search-focus-filter');

    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;
        
        let results = data.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            (item.tags && item.tags.toLowerCase().includes(query)) ||
            (item.key_works && item.key_works.toLowerCase().includes(query)) ||
            (item.primary_field && item.primary_field.toLowerCase().includes(query)) ||
            (item.key_contributions && item.key_contributions.toLowerCase().includes(query)) ||
            (item.relevance_to_phd && item.relevance_to_phd.toLowerCase().includes(query)) ||
            (item.focus_tags && item.focus_tags.toLowerCase().includes(query))
        );
        const fval = (focusSelect?.value || 'all').toLowerCase();
        if (fval !== 'all') {
            results = results.filter(item => getFocusTokens(item.focus_tags).includes(fval));
        }
        lastSearchResults = results;
        lastSearchQuery = query;
        renderSearchResults(results, query);
    };
    
    searchBtn?.addEventListener('click', performSearch);
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    modeSelect?.addEventListener('change', () => {
        if (lastSearchResults?.length) renderSearchResults(lastSearchResults, lastSearchQuery);
    });
    focusSelect?.addEventListener('change', () => {
        if (lastSearchQuery) performSearch();
    });
    exportBtn?.addEventListener('click', () => {
        if (!lastSearchResults?.length) { alert('Search first to export results.'); return; }
        const md = buildMarkdownForSearch(lastSearchResults, lastSearchQuery);
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(md).then(() => alert('Copied search results to clipboard!'))
                .catch(() => { prompt('Copy the markdown:', md); });
        } else {
            prompt('Copy the markdown:', md);
        }
    });
}

function renderSearchResults(results, query) {
    const mode = document.getElementById('search-mode')?.value || 'cards';
    if (mode === 'chronological') return displaySearchChrono(results);
    if (mode === 'network') return displaySearchNetwork(results);
    return displaySearchCards(results, query);
}

function displaySearchResults(results, query) {
    // Backward compatibility if called elsewhere
    return displaySearchCards(results, query);
}

function displaySearchCards(results, query) {
    const container = document.getElementById('search-results');
    
    if (results.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No results found</h3></div>';
        return;
    }
    
    container.innerHTML = results.map(item => {
        let description = item.description;
        const regex = new RegExp(`(${query})`, 'gi');
        description = description.replace(regex, '<span class="match-highlight">$1</span>');
        
        return `
            <div class="search-result-card" data-id="${item.id}">
                <span class="type-badge type-${item.type}">${item.type}</span>
                <h3>${item.name}</h3>
                <p>${getYearRange(item)}</p>
                <p>${description.substring(0, 200)}...</p>
                <div class="tags">
                    ${item.tags ? item.tags.split(';').slice(0, 5).map(tag => 
                        `<span class="tag">#${tag.trim()}</span>`
                    ).join('') : ''}
                </div>
            </div>
        `;
    }).join('');
    
    container.querySelectorAll('.search-result-card').forEach(card => {
        card.addEventListener('click', () => {
            showDetail(card.dataset.id);
        });
    });
}

function displaySearchChrono(results) {
    const container = document.getElementById('search-results');
    const sorted = [...results].sort((a,b) => (parseYear(a.year_start)||0) - (parseYear(b.year_start)||0));
    container.innerHTML = sorted.map(item => `
        <div class="timeline-item" data-id="${item.id}">
            <div class="timeline-date">${formatYear(item.year_start)}</div>
            <div class="timeline-content">
                <span class="type-badge type-${item.type}">${item.type}</span>
                <h3>${item.name}</h3>
                <p>${item.description.substring(0, 180)}${item.description.length > 180 ? '...' : ''}</p>
            </div>
        </div>
    `).join('');
    container.querySelectorAll('.timeline-item').forEach(node => node.addEventListener('click', () => showDetail(node.dataset.id)));
}

function displaySearchNetwork(results) {
    const container = document.getElementById('search-results');
    container.classList.add('network-mode');
    const w = container.clientWidth || 1000;
    const h = Math.max(500, Math.floor(window.innerHeight * 0.75));
    container.innerHTML = `
        <div class="search-network-toolbar">
            <button id="search-network-download">Download PNG</button>
        </div>
        <canvas id="search-network-canvas" width="${w}" height="${h}" style="width:100%;height:${h}px;border:1px solid #ddd;border-radius:8px;"></canvas>
    `;
    const canvas = document.getElementById('search-network-canvas');
    const ctx = canvas.getContext('2d');

    // Build subgraph
    const ids = new Set(results.map(r => r.id));
    const nodes = results.map(r => ({ id: r.id, name: r.name, type: r.type, x: Math.random()*w-w/2, y: Math.random()*h-h/2, vx:0, vy:0 }));
    const nodesById = Object.fromEntries(nodes.map(n => [n.id, n]));
    const edges = [];
    results.forEach(item => {
        if (item.related_to) item.related_to.split(';').forEach(t => {
            const tid = t.trim();
            if (ids.has(tid)) edges.push({ source: item.id, target: tid });
        });
    });

    // Simple forces
    const iter = 80;
    for (let k=0;k<iter;k++) {
        // repulsion
        for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
            const a=nodes[i], b=nodes[j];
            const dx=b.x-a.x, dy=b.y-a.y; const d=Math.hypot(dx,dy)||1; const f=800/(d*d);
            a.vx -= (dx/d)*f; a.vy -= (dy/d)*f; b.vx += (dx/d)*f; b.vy += (dy/d)*f;
        }
        // attraction
        edges.forEach(e => { const s=nodesById[e.source], t=nodesById[e.target]; if(!s||!t) return; const dx=t.x-s.x, dy=t.y-s.y; const d=Math.hypot(dx,dy)||1; const f=d*0.01; s.vx += (dx/d)*f; s.vy += (dy/d)*f; t.vx -= (dx/d)*f; t.vy -= (dy/d)*f; });
        nodes.forEach(n => { n.x += n.vx; n.y += n.vy; n.vx*=0.8; n.vy*=0.8; });
    }

    // Center graph
    let cw = canvas.width, ch = canvas.height;
    let cx = cw/2, cy = ch/2;
    function draw() {
        ctx.clearRect(0,0,cw,ch);
        ctx.save(); ctx.translate(cx, cy);
        // edges
        ctx.strokeStyle='#ccc'; ctx.lineWidth=1;
        edges.forEach(e => { const s=nodesById[e.source], t=nodesById[e.target]; if(!s||!t) return; ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(t.x,t.y); ctx.stroke(); });
        // nodes
        nodes.forEach(n => {
            let c = n.type==='person' ? '#667eea' : (n.type==='framework' ? '#f093fb' : '#4facfe');
            ctx.fillStyle=c; ctx.beginPath(); ctx.arc(n.x,n.y,7,0,Math.PI*2); ctx.fill();
        });
        // labels (simple)
        ctx.fillStyle='#333'; ctx.font='12px sans-serif'; ctx.textAlign='center';
        nodes.forEach(n => ctx.fillText(n.name, n.x, n.y-12));
        ctx.restore();
    }
    draw();
    // click to open modal
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX-rect.left-cx, my = e.clientY-rect.top-cy;
        const hit = nodes.find(n => Math.hypot(n.x-mx, n.y-my) < 8);
        if (hit) showDetail(hit.id);
    });

    // Responsive resize
    const onResize = () => {
        const newW = container.clientWidth || cw;
        const newH = Math.max(500, Math.floor(window.innerHeight * 0.75));
        canvas.width = newW; canvas.height = newH; canvas.style.height = `${newH}px`;
        cw = canvas.width; ch = canvas.height; cx = cw/2; cy = ch/2;
        draw();
    };
    window.addEventListener('resize', onResize);

    // Download PNG
    document.getElementById('search-network-download')?.addEventListener('click', () => {
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url; a.download = 'search-network.png';
        document.body.appendChild(a); a.click(); a.remove();
    });
}

function buildMarkdownForSearch(results, query) {
    const title = query ? `# Search: ${query}\n` : '# Search Results\n';
    const groups = { person: [], framework: [], concept: [] };
    results.forEach(r => groups[r.type]?.push(r));
    const line = (r) => {
        const tags = [];
        if (r.tags) tags.push(...r.tags.split(';').map(s=>s.trim()).filter(s=>/^[a-z0-9-]{1,40}$/i.test(s)).map(t=>`#${t}`));
        if (r.focus_tags) r.focus_tags.split(/[;,]/).forEach(t => { t=t.trim(); if (t && /^[a-z0-9-]{1,30}$/i.test(t)) tags.push(`#${t}`); });
        const period = getYearRange(r);
        const meta = [period!=='Unknown'?` (${period})`:'', tags.length?` ${tags.join(' ')}`:''].join('');
        return `- [[${r.name}]]${meta}`;
    };
    const section = (label, arr) => arr.length ? `\n## ${label}\n` + arr.map(line).join('\n') : '';
    return title + section('People', groups.person) + section('Frameworks', groups.framework) + section('Concepts', groups.concept) + '\n';
}

// Populate Focus selects (Timeline, Network, Search)
function populateFocusFilters() {
    if (focusOptionsPopulated) return;
    const set = new Set();
    data.forEach(item => {
        getFocusTokens(item.focus_tags).forEach(t => set.add(t));
    });
    const opts = Array.from(set).sort();
    ['timeline-focus-filter', 'network-focus-filter', 'search-focus-filter'].forEach(id => {
        const sel = document.getElementById(id);
        if (!sel) return;
        opts.forEach(v => {
            const o = document.createElement('option');
            o.value = v; o.textContent = v;
            sel.appendChild(o);
        });
    });
    focusOptionsPopulated = true;
}

// DETAIL MODAL
function showDetail(id) {
    const item = data.find(d => d.id === id);
    if (!item) return;
    
    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    
    const relatedItems = item.related_to 
        ? item.related_to.split(';').map(rid => data.find(d => d.id === rid.trim())).filter(Boolean)
        : [];
    
    modalBody.innerHTML = `
        <h2>${item.name}</h2>
        <div class="modal-meta">
            <span class="type-badge type-${item.type}">${item.type}</span>
            <span><strong>Period:</strong> ${getYearRange(item)}</span>
        </div>
        
        <div class="modal-section">
            <h3>Description</h3>
            <p>${item.description}</p>
        </div>
        
        ${item.primary_field || item.key_contributions ? `
            <div class="modal-section">
                <h3>Profile</h3>
                ${item.primary_field ? `<p><strong>Primary Field / Focus:</strong> ${item.primary_field}</p>` : ''}
                ${item.key_contributions ? `<p><strong>Key Contributions / Theory:</strong> ${item.key_contributions}</p>` : ''}
            </div>
        ` : ''}

        ${item.key_works ? `
            <div class="modal-section">
                <h3>Key Works</h3>
                <p>${item.key_works}</p>
            </div>
        ` : ''}
        
        ${item.tags ? `
            <div class="modal-section">
                <h3>Tags</h3>
                <div class="tags">
                    ${item.tags.split(';').map(t => t.trim()).filter(t => /^[a-z0-9-]{1,40}$/i.test(t)).map(tag => 
                        `<span class="tag">#${tag}</span>`
                    ).join('')}
                </div>
            </div>
        ` : ''}

        ${item.focus_tags ? `
            <div class="modal-section">
                <h3>Focus</h3>
                <div class="tags focus-tags">
                    ${item.focus_tags.split(/[;,]/).map(t => t.trim()).filter(t => /^[a-z0-9-]{1,30}$/i.test(t)).map(tag => 
                        `<span class="tag" data-focus="1">#${tag}</span>`
                    ).join('')}
                </div>
            </div>
        ` : ''}

        ${item.relevance_to_phd ? `
            <div class="modal-section">
                <h3>Relevance to my PhD</h3>
                <p>${item.relevance_to_phd}</p>
            </div>
        ` : ''}
        
        ${relatedItems.length > 0 ? `
            <div class="modal-section">
                <h3>Related Entries (${relatedItems.length})</h3>
                <div class="related-items">
                    ${relatedItems.map(rel => 
                        `<div class="related-item" data-id="${rel.id}">${rel.name}</div>`
                    ).join('')}
                </div>
            </div>
        ` : ''}
    `;
    
    modal.style.display = 'block';
    
    // Setup related item clicks
    modalBody.querySelectorAll('.related-item').forEach(rel => {
        rel.addEventListener('click', () => {
            showDetail(rel.dataset.id);
        });
    });

    // Make tags clickable -> Tag Explorer
    modalBody.querySelectorAll('.tags .tag').forEach(tagEl => {
        tagEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const isFocus = tagEl.dataset.focus === '1';
            const raw = tagEl.textContent || '';
            const tag = raw.replace(/^#/, '').trim();

            if (isFocus) {
                // Route focus tags to Search (includes focus_tags)
                switchToView('search');
                const results = data.filter(item => 
                    (item.name && item.name.toLowerCase().includes(tag.toLowerCase())) ||
                    (item.description && item.description.toLowerCase().includes(tag.toLowerCase())) ||
                    (item.tags && item.tags.toLowerCase().includes(tag.toLowerCase())) ||
                    (item.key_works && item.key_works.toLowerCase().includes(tag.toLowerCase())) ||
                    (item.focus_tags && item.focus_tags.toLowerCase().includes(tag.toLowerCase()))
                );
                displaySearchResults(results, tag);
                return;
            }

            // Normal tags -> Tag Explorer
            switchToView('tag-explorer');
            renderTagExplorer();
            // Show entries for the selected tag
            showTagEntries(tag);
        });
    });
}

// Modal close handlers
document.querySelector('.close')?.addEventListener('click', () => {
    document.getElementById('detail-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('detail-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

// Helper: programmatically switch view and nav
function switchToView(view) {
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.view === view);
    });
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    currentView = view;
    const section = document.getElementById(`${view}-view`);
    if (section) section.classList.add('active');
}
