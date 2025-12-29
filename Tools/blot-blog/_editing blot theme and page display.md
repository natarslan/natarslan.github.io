
## Increase the number of tags displayed on the side bar

- go to theme (edit template - edit)
- find **[css-theme.css](https://blot.im/sites/natarslan/template/magazine/source-code/css-theme.css/edit)** 
- line 254

> .clip-tags a:nth-child(n+6){display:none}

by changing the number n+6 into 10 or 15 etc you can increase how many tags will be displayed on the left bar.

## Re-order left menu tags alphabetically

- i can add tags as clickable menu-items on the left part of the page. to do this
	- add tags: mytag in the top of an md file
	- mytag will appear as a menu item and once clicked will show all posts with same tag
- initially tha magazine template didnt order the tags alphabetically. So how to order them?

1. download template as zip file by clicking download [here](https://blot.im/sites/natarslan/template/magazine)
2. search where your html 'body' tag is being closed (i opened the folder in VSC and searched for </body> )
3. In my case the footer.html has the body tag closure
4. open footer.html and the following code before the tag closure

```html
<!-- Your JavaScript for sorting the tags --> 

    <script>
      document.addEventListener("DOMContentLoaded", function() {
        var tagContainer = document.querySelector('.clip-tags'); // The container holding the tags
        if (!tagContainer) return;

        // Get all the <a> elements (tags) within the container
        var tags = Array.from(tagContainer.getElementsByTagName('a'));

        // Sort the tags alphabetically
        tags.sort(function(a, b) {
          var textA = a.textContent.trim().toLowerCase();
          var textB = b.textContent.trim().toLowerCase();
          return textA.localeCompare(textB); // Compare the tag text alphabetically
        });

        // Clear the current tags and append the sorted tags
        tagContainer.innerHTML = ''; // Empty the container
        tags.forEach(function(tag) {
          tagContainer.appendChild(tag); // Append the tags in sorted order
        });
      });
    </script>

```
