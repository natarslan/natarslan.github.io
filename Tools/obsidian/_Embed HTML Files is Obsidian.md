
## To render html files in Obsidian (wont work in Blot)

```html
!iframe[Projects/code/miners-strike/_output/map_with_popups.html]
```
## Embed HTML files In A Blot Post

### Iframe — A proper big embed

### You can customize:

- `width="100%"` — makes it responsive and full-width
- `height="600"` — adjust this as needed (e.g., try 700 or 800 if it's still too short)
- `style="border: none;"` — removes the default frame border

```python
<iframe src="/Projects/code/miners-strike/_output/map_with_popups.html" width="100%" height="600" style="border: none;"></iframe>
```
### Super mini markdown embed (still interactive)
```html
![Map](/Projects/code/miners-strike/_output/map_with_popups.html)
```
