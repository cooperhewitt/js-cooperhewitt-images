(function($) {
	/*
	this creates the click-to-scale functionality on object pages. It should called from the document ready, so that
	that the DOM has loaded but the image hasn't. It works by grabbing the default full-sized image and intercepting its 
	load, instead putting a smaller preload image into the DOM while continuing to load the full-size image in a hidden 
	img element (this ensures non-JS users see the full-size image, even if it takes a little longer to load).

	It also applies scaling code that toggles between a scaled and unscaled image on click.
	*/
	var _initImageDisplayer = function($el) {
		$image = $el.find("img");

		if($image.length == 0 || ! $image.is('[data-allow-redraw]')) return;

		var imageSrc = $image.attr('src');
		var fullImageSrc = $el.data('image-full-src');
		var loadImageSrc = $el.data('image-loading-src');
		
		//add loading image
		var $loadingImage = $('<img />');
		$loadingImage
//			.addClass('img-responsive')
			.attr('src', loadImageSrc)
			.insertAfter($image);

		//remove full size img
		$image.remove();

		//add load listener to full size img
		$image.on('load', function() {
			//hide dither, show full size
			$loadingImage.addClass('hidden');
			$image.addClass('collapsed').removeClass('hidden');

			//if the image being loaded is the error image, don't continue to implement scaling functionality
			if($image.data('load-error')) return;

			//toggle between full/scaled on click
			$image.parent('a').on('click', function(e) {
				e.preventDefault();
				$image.toggleClass('expanded collapsed');
				_scaleImage($image);
			});
		});

		//add full size back to kick off load
		//remove and readd src to force our onload handler to be executed if the image has already loaded from cache
		$image.addClass('hidden').attr('src', '').attr('src', imageSrc).insertBefore($loadingImage);
	};

	$.fn.imageDisplayer = function() {
		_initImageDisplayer(this);
	};
})(jQuery);
