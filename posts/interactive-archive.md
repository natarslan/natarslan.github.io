
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Blog Contents</title>
    <style>
        :root {
            --primary-color: #2ecc71;
            --secondary-color: #f8f9fa;
            --text-color: #333;
            --light-gray: #f1f1f1;
            --border-color: #ddd;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fafafa;
        }
        
        h1 {
            color: var(--primary-color);
            text-align: center;
            margin-bottom: 30px;
            font-weight: 300;
            font-size: 2.5rem;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 15px;
        }
        
        .intro {
            text-align: center;
            margin-bottom: 40px;
            font-size: 1.1rem;
            color: #555;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            text-align: justify;
            text-align-last: center;
            hyphens: auto;
        }
        
        .search-container {
            display: flex;
            margin-bottom: 20px;
        }
        
        #search {
            flex-grow: 1;
            padding: 12px 15px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 16px;
            transition: all 0.3s;
        }
        
        #search:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.2);
        }
        
        .tag-cloud {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 30px;
            justify-content: center;
        }
        
        .tag {
            background-color: var(--light-gray);
            color: var(--primary-color);
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid #e0e0e0;
        }
        
        .tag:hover {
            background-color: var(--primary-color);
            color: white;
        }
        
        .tag.active {
            background-color: var(--primary-color);
            color: white;
        }
        
        .table-container {
            overflow-x: auto;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            background-color: white;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background-color: var(--primary-color);
            color: white;
            padding: 15px;
            text-align: left;
            position: sticky;
            top: 0;
        }
        
        td {
            padding: 12px 15px;
            border-bottom: 1px solid var(--border-color);
        }
        
        tr:hover {
            background-color: rgba(46, 204, 113, 0.05);
        }
        
        .title {
            font-weight: 600;
            color: var(--primary-color);
        }
        
        .summary {
            color: #555;
            font-size: 0.95rem;
        }
        
        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        
        .tag-in-table {
            background-color: var(--light-gray);
            color: var(--primary-color);
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
        }
        
        .url a {
            color: var(--primary-color);
            text-decoration: none;
            display: inline-block;
            padding: 5px 0;
        }
        
        .url a:hover {
            text-decoration: underline;
        }
        
        .curiosity {
            font-style: italic;
            color: #666;
            font-size: 0.9rem;
        }
        
        .questions {
            font-size: 0.85rem;
            color: #777;
        }
        
        .no-results {
            text-align: center;
            padding: 40px;
            color: #777;
            font-style: italic;
        }
        
        @media (max-width: 768px) {
            .table-container {
                border-radius: 0;
            }
            
            th, td {
                padding: 8px 10px;
                font-size: 0.9rem;
            }
            
            .intro {
                text-align: left;
                text-align-last: left;
            }
        }
    </style>
</head>
<body>
    <h1>My Blog Contents</h1>
    
    <div class="intro">
        Welcome!👋🏽 Here you'll find a collection of my thoughts, tutorials, and explorations on various topics. Use the search and tags below to navigate through the content. Each entry includes key insights and questions that sparks my curiosity.
    </div>
    
    <div class="search-container">
        <input type="text" id="search" placeholder="Search across all posts...">
    </div>
    
    <div class="tag-cloud" id="tagCloud">
        <!-- Tags will be dynamically inserted here -->
    </div>
    
    <div class="table-container">
        <table id="blogTable">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Summary</th>
                    <th>Tags</th>
                    <th>URL</th>
                    <th>Curiosity</th>
                    <th>Questions</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                <!-- Content will be dynamically inserted here -->
            </tbody>
        </table>
        <div id="noResults" class="no-results" style="display: none;">
            No posts match your search criteria. Try a different search term or tag.
        </div>
    </div>

    <script>
        // Function to parse Markdown content into blog posts
        function parseMarkdownToPosts(markdownContent) {
            const posts = [];
            const sections = markdownContent.split('## ');
            
            // Skip the first empty section if exists
            for (let i = 1; i < sections.length; i++) {
                const section = sections[i].trim();
                if (!section) continue;
                
                const post = {};
                const lines = section.split('\n').map(line => line.trim()).filter(line => line);
                
                // First line is the title
                post.title = lines[0];
                
                // Parse key-value pairs
                for (let j = 1; j < lines.length; j++) {
                    const line = lines[j];
                    const colonIndex = line.indexOf(':');
                    if (colonIndex > -1) {
                        const key = line.substring(0, colonIndex).trim().toLowerCase();
                        const value = line.substring(colonIndex + 1).trim();
                        post[key] = value;
                    }
                }
                
                // Ensure required fields
                if (!post.tags) post.tags = 'uncategorized';
                if (!post.url) post.url = '#' + post.title.toLowerCase().replace(/\s+/g, '-');
                
                posts.push(post);
            }
            
            return posts;
        }
        
        // Function to fetch and process Markdown file
        async function loadPostsFromMarkdown(markdownUrl) {
            try {
	             const markdownUrl = 'https://dl.dropboxusercontent.com/scl/fi/nw8vf5hx1cdpqt8w3r9rs/_MapOfContent.md?rlkey=be4x1ulb5jaqn1b96ps9u3xjq';
				const response = await fetch(markdownUrl);
                if (!response.ok) throw new Error('Failed to load Markdown file');
                const markdownContent = await response.text();
                return parseMarkdownToPosts(markdownContent);
            } catch (error) {
                console.error('Error loading Markdown file:', error);
                return [];
            }
        }
        
        // Function to render posts to the table
        function renderPosts(posts) {
            const tableBody = document.getElementById('tableBody');
            const tagCloud = document.getElementById('tagCloud');
            const noResults = document.getElementById('noResults');
            const allTags = new Set();

            // Clear existing content
            tableBody.innerHTML = '';

            // Create table rows
            posts.forEach(post => {
                const tags = post.tags.split(',').map(t => t.trim());
                tags.forEach(tag => allTags.add(tag)); // Collect all unique tags

                const row = document.createElement('tr');
                row.setAttribute('data-tags', tags.join(','));

                row.innerHTML = `
                    <td class="title">${post.title || 'Untitled Post'}</td>
                    <td class="summary">${post.summary || ''}</td>
                    <td class="tags">
                        ${tags.map(tag => `<span class="tag-in-table">${tag}</span>`).join('')}
                    </td>
                    <td class="url"><a href="${post.url || '#'}" target="_blank">Read more</a></td>
                    <td class="curiosity">${post.curiosity || ''}</td>
                    <td class="questions">${post.questions || ''}</td>
                `;

                tableBody.appendChild(row);
            });

            // Create tag cloud
            tagCloud.innerHTML = '';
            Array.from(allTags).sort().forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'tag';
                tagElement.textContent = `#${tag}`;
                tagElement.dataset.tag = tag;
                tagCloud.appendChild(tagElement);

                // Add click event listener for filtering
                tagElement.addEventListener('click', function () {
                    const isActive = this.classList.contains('active');
                    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));

                    if (!isActive) {
                        this.classList.add('active');
                        const rows = Array.from(tableBody.querySelectorAll('tr'));
                        filterTable(null, tag, rows, noResults);
                    } else {
                        const rows = Array.from(tableBody.querySelectorAll('tr'));
                        filterTable(null, null, rows, noResults);
                    }
                });
            });

            // Initialize filtering
            const rows = Array.from(tableBody.querySelectorAll('tr'));
            setupFiltering(rows, noResults);
        }
        
        // Setup filtering functionality
        function setupFiltering(rows, noResults) {
            const searchInput = document.getElementById('search');

            searchInput.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                const activeTag = document.querySelector('.tag.active');
                const tag = activeTag ? activeTag.dataset.tag : null;

                filterTable(searchTerm, tag, rows, noResults);
            });

            // Initial filter to show all rows
            filterTable(null, null, rows, noResults);
        }
        
        // Filter table based on search term and/or tag
        function filterTable(searchTerm, tag, rows, noResults) {
            let visibleRows = 0;

            rows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                const rowTags = row.getAttribute('data-tags');

                const matchesSearch = !searchTerm || rowText.includes(searchTerm);
                const matchesTag = !tag || rowTags.includes(tag);

                if (matchesSearch && matchesTag) {
                    row.style.display = '';
                    visibleRows++;
                } else {
                    row.style.display = 'none';
                }
            });

            if (noResults) {
                noResults.style.display = visibleRows > 0 ? 'none' : '';
            }
        }
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', async function() {
            // Load posts from Markdown file (change this to your actual file path)
            const posts = await loadPostsFromMarkdown('blog-posts.md');
            
            // If no posts loaded (maybe file not found), use sample data
            if (posts.length === 0) {
                console.warn('Using sample data as Markdown file could not be loaded');
                const sampleMarkdown = `
## Understanding JavaScript Closures
title: Understanding JavaScript Closures
summary: A deep dive into how closures work in JavaScript with practical examples.
tags: javascript, web development, tutorial
url: /understanding-javascript-closures
curiosity: Did you know closures are used in module patterns and currying?
questions: How do closures affect memory management? What are practical use cases?

## My Writing Workflow
title: My Writing Workflow
summary: How I organize my writing process to maintain consistency and quality.
tags: productivity, writing, tips
url: /my-writing-workflow
curiosity: The average writer spends 40% of their time editing.
questions: How can technology enhance writing workflows? What tools are most effective?

## Redesigning for Accessibility
title: Redesigning for Accessibility
summary: A case study on making a website more accessible without sacrificing design.
tags: design, ux, case study
url: /redesigning-for-accessibility
curiosity: Accessible designs often improve the experience for all users.
questions: How to balance aesthetics and accessibility? What are common pitfalls?
                `;
                const samplePosts = parseMarkdownToPosts(sampleMarkdown);
                renderPosts(samplePosts);
            } else {
                renderPosts(posts);
            }
        });
    </script>
</body>
</html>