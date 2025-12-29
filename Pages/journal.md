## journal 📓

<html>
<head>
    <title>Private Journal</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        /* Style for the floating TOC on the right */
        #toc {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fff;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 250px;
            max-height: 90vh;
            overflow-y: auto;
            display: block;
        }
        /* Button to hide/reveal TOC */
        #toggleTocButton {
            position: fixed;
            top: 20px;
            right: 280px;
            background-color: #000; /* Black background */
            color: white; /* White text */
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .toc-item {
		    cursor: pointer;
		    padding: 5px 0;
		}
		
		.toc-item ul {
		    padding-left: 20px;
		    display: none; /* Hide sub-items by default */
		}
		
		.toc-item.open > ul {
		    display: block; /* Show sub-items when clicked */
		}
		
		#toc ul {
		    list-style-type: none;
		    padding-left: 0;
		}
		
		#toc li {
		    padding: 5px;
		    font-size: 16px;
		    cursor: pointer;
		}
		
		.toc-item a {
		    color: #333;
		    text-decoration: none;
		}
		
		.toc-item:hover {
		    color: #007bff;
		}

        #container {
            max-width: 90%;
            width: 100%;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: none; /* Hide initially */
        }
        h2, h3 {
            color: #444;
            cursor: pointer;
        }
        pre {
            background: #333;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        
    /* Basic Header Style */
		h2 {
		    margin-bottom: 20px; /* Ensures space below the header */
		    position: relative; /* Needed for the ::after pseudo-element to position correctly */
		}
		
		/* First Paragraph after h2 for Drop Cap Effect */
		h2 + p:first-of-type {
		    font-size: 2.5em;
		    line-height: 1.2;
		    text-indent: -0.1em; /* To pull the text slightly back */
		}
		
		/* First Letter of First Paragraph after h2 */
		h2 + p:first-of-type::first-letter {
		    font-size: 4em; /* Makes the first letter large */
		    font-weight: bold;
		    float: left;
		    margin-right: 10px;
		    line-height: 1.1;
		}
		
		/* Underline (Pseudo-element for h2) */
		h2::after {
		    content: '';
		    position: absolute;
		    left: 0;
		    bottom: 0;
		    width: 100%;
		    height: 2px;
		    background: #333;
		    border-radius: 2px;
		    margin-top: 10px; /* Adjust margin to set distance between text and line */
		}
		
		/* Margin and spacing for paragraphs after h2 */
		h2 + p {
		    margin-top: 15px; /* Space above the first paragraph */
		    line-height: 1.8;
		}



        blockquote {
            border-left: 5px solid #ddd;
            padding-left: 10px;
            color: #555;
            font-style: italic;
        }
        .content-hide {
            display: none;
        }
        .toc-item {
            cursor: pointer;
            padding: 5px 0;
        }
        .toc-item ul {
            padding-left: 20px;
            display: none; /* Hide sub-items by default */
        }
        .toc-item.open > ul {
            display: block; /* Show sub-items when clicked */
        }
    </style>
</head>
<body>
    <!-- Button to toggle TOC visibility -->
    <button id="toggleTocButton">Toggle TOC</button>

    <!-- TOC container -->
    <div id="toc"></div>

    <div id="container">
        <h2>Nat's Journal</h2>
        <div id="content">Loading...</div>
    </div>

    <script>
        async function getStoredPassword() {
            let passwordURL = "https://dl.dropboxusercontent.com/scl/fi/0rii8wqtiq4i28d3pbz7e/password.md?rlkey=f2qrwzaeuea3qkn3d1743k7h4&st=ok5uhbmf&dl=0"; // Replace with actual link

            try {
                let response = await fetch(passwordURL);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return (await response.text()).trim(); // Fetch password and trim spaces
            } catch (error) {
                console.error("Error fetching password:", error);
                alert("Could not verify password. Try again later.");
                return null; // Prevent further execution if fetch fails
            }
        }

        async function checkPassword() {
            let storedPassword = await getStoredPassword();
            if (!storedPassword) return; // Stop if password fetch fails

            let passcode = prompt("Enter PassCode");
            if (passcode === storedPassword) {
                alert("Access Granted!");
                document.getElementById("container").style.display = "block";
                fetchPrivateJournal();
            } else {
                alert("Incorrect Password");
                checkPassword(); // Retry on failure
            }
        }

        async function fetchPrivateJournal() {
            let privateJournalURL = "https://dl.dropboxusercontent.com/scl/fi/p3k62rryu90upmf3qdglk/natjournal.md?rlkey=johsukb9dzqx3gd4169u8g5jj&st=a7q45gdc&dl=1"; // Replace with actual link

            try {
                let response = await fetch(privateJournalURL);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                let text = await response.text();

                // Convert Markdown to HTML using marked.js
                document.getElementById("content").innerHTML = marked.parse(text);
                createTOC(); // Generate TOC after loading content
            } catch (error) {
                console.error("Error loading journal:", error);
                document.getElementById("content").innerHTML = "<p>Error loading journal. Try again later.</p>";
            }
        }

        checkPassword();
        
        
        function createTOC() {
            const tocContainer = document.getElementById("toc");
            const headers = document.querySelectorAll("h1, h2, h3");
            let tocHTML = "<ul>";

            let currentH1 = null;
            headers.forEach((header, index) => {
                const id = "section-" + index;
                header.id = id; // Add unique ID for each header

                const level = header.tagName.toLowerCase();
                const tocItem = `<li class="toc-item ${level === 'h1' ? 'h1' : ''}" data-id="${id}" style="margin-left: ${level === 'h1' ? 0 : level === 'h2' ? '20px' : '40px'};">
                    <a href="#${id}">${header.innerText}</a>
                    ${level === 'h1' ? '<ul></ul>' : ''}
                </li>`;

                if (level === 'h1') {
                    if (currentH1) {
                        tocHTML += "</ul>"; // Close previous h1 sublist
                    }
                    currentH1 = id;
                }

                tocHTML += tocItem;
            });

            tocHTML += "</ul>";
            tocContainer.innerHTML = tocHTML;

            // Add event listeners for foldable TOC items
            document.querySelectorAll('.toc-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent click event from bubbling up
                    if (this.classList.contains('h1')) {
                        this.classList.toggle('open');
                    }
                });
            });
        }

        // Function to toggle TOC visibility
        document.getElementById("toggleTocButton").addEventListener("click", function() {
            const toc = document.getElementById("toc");
            const isVisible = toc.style.display !== "none";
            toc.style.display = isVisible ? "none" : "block"; // Toggle visibility
        });


    </script>
</body>
</html>
