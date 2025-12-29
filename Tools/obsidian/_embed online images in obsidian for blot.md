## masonary grid

- grids are tiny bit off
- when clicked nice full view

<style>
.img-masonry {
  column-width: 100px; /* Adjust for desired column size */
  column-gap: 10px;
}
.img-masonry img {
  width: 100%;
  display: block;
  border-radius: 5px; /* Optional: Rounded corners */
}
</style>

<div class="img-masonry">
  <img src="/_Attachments/Flickr/img_20240814_183346_53924106743_o.jpg">
  <img src="/_Attachments/Flickr/2024-12-23_54223130961_o.jpg">
  <img src="/_Attachments/Flickr/drops_53939742792_o.jpg">
  <img src="/_Attachments/Flickr/family_54266702439_o.jpg">
  <img src="/_Attachments/Flickr/img_2023-08-30_18_20_26_53986535994_o.jpg">
  <img src="/_Attachments/Flickr/img_2024-08-02_22_11_52_1_53906605637_o.jpg">
  <img src="/_Attachments/Flickr/img_2024-08-16_14_38_55_2_53929313477_o.jpg">
</div>

## square grids

- nice small squares
- when clicked images open in another page

<style>
.img-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}
.img-grid div {
  width: 100%;
  aspect-ratio: 1 / 1; /* Forces square shape */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  overflow: hidden;
  border-radius: 5px; /* Optional: Rounded corners */
}
.img-grid img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Ensures full image is visible inside the square */
}

/* Lightbox effect when clicking images */
.img-grid a {
  display: block;
  width: 100%;
  height: 100%;
}
.img-grid a img {
  transition: transform 0.3s ease-in-out;
}
.img-grid a:hover img {
  transform: scale(1.05);
}
</style>

<div class="img-grid">
  <div><a href="/_Attachments/Flickr/img_20240814_183346_53924106743_o.jpg" target="_blank">
    <img src="/_Attachments/Flickr/img_20240814_183346_53924106743_o.jpg"></a></div>
  <div><a href="/_Attachments/Flickr/2024-12-23_54223130961_o.jpg" target="_blank">
    <img src="/_Attachments/Flickr/2024-12-23_54223130961_o.jpg"></a></div>
  <div><a href="/_Attachments/Flickr/drops_53939742792_o.jpg" target="_blank">
    <img src="/_Attachments/Flickr/drops_53939742792_o.jpg"></a></div>
  <div><a href="/_Attachments/Flickr/family_54266702439_o.jpg" target="_blank">
    <img src="/_Attachments/Flickr/family_54266702439_o.jpg"></a></div>
  <div><a href="/_Attachments/Flickr/img_2023-08-30_18_20_26_53986535994_o.jpg" target="_blank">
    <img src="/_Attachments/Flickr/img_2023-08-30_18_20_26_53986535994_o.jpg"></a></div>
  <div><a href="/_Attachments/Flickr/img_2024-08-02_22_11_52_1_53906605637_o.jpg" target="_blank">
    <img src="/_Attachments/Flickr/img_2024-08-02_22_11_52_1_53906605637_o.jpg"></a></div>
  <div><a href="/_Attachments/Flickr/img_2024-08-16_14_38_55_2_53929313477_o.jpg" target="_blank">
    <img src="/_Attachments/Flickr/img_2024-08-16_14_38_55_2_53929313477_o.jpg"></a></div>
</div>
