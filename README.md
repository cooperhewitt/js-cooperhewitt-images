# js-cooperhewitt-images

Image layout functionality as used on the [Cooper Hewitt Online Collections](http://collection.cooperhewitt.org). Check out the [live demo](https://cooperhewitt.github.io/js-cooperhewitt-images/).

## Thumbnail Grids: `jquery.imageGrid.js`

`jquery.imageGrid.js` creates a grid of square thumbnails with rollover functionality. It assumes your markup is structured thusly:

```
<ul id="myImageGrid" class="thumbnails">
  <li class="thumbnail">
    <a href="#">
      <img class="out" src="/path/to/image.jpg" data-allow-redraw />
    </a>
  </li>
</ul>
```

and is invoked by calling `imageGrid()` on the jQuery element like so: `$('#myImageGrid').imageGrid()`

### Rollover
It also assumes your images are named in a fashion where the rollover and rollout images for a single thumbnail share a common root with a stated size, for example `image1_out.jpg` and `image1_over.jpg`. You can configure these extensions and other parameters by using `data` attribues on the outer wrapper. Specifically:
* `data-mouseout-image-size` The unique part of the mouseout image's filename. In `image1_out.jpg`, this is the string `out`. The default is `out`.
* `data-mouseover-image-size` The unique part of the mouseover image's filename. In `image1_over.jpg`, this is the string `over`. The default is `over`
* `data-mouseout-class-name` A class that will be applied to the mouseout image. Defaults to `out`.
* `data-mouseover-class-name` A class that will be applied to the mouseout image. Defaults to `over`.

### Image Alignment
While the thumbnails are always square, they are capable of displaying non-square images. A class name of `portrait` or `landscape` will be applied accordingly. In the case of `landscape` images, a `top` CSS attribute will be calculated so as to vertically center the images. `portrait` images are centered in the CSS file.

### Other notes:
* Removing `data-allow-redraw` from within a `li.thumbnail` will disable the rollover code for an individual thumbnail.
* The `a href` doesn't have to be `#` - make it whatever URL you want.