// jQuery Image Grid Plugin

(function($) {
	var _initThumbnailImageRollovers = function($el) {
		var $thumbnailsHolder = $el;
		var $thumbnails = $thumbnailsHolder.find('.thumbnail');

		if($thumbnails.length == 0) return;

		var outSize = $thumbnailsHolder.data('mouseout-image-size') || 'out';
		var outClass = $thumbnailsHolder.data('mouseout-class-name') || 'out';
		var overSize = $thumbnailsHolder.data('mouseover-image-size') || 'over';
		var overClass = $thumbnailsHolder.data('mouseover-class-name') || 'over';

		//add rollover images to DOM through JS
		$thumbnails.each(function() {
			var $thumbnail = $(this);
			var $thumbnailImg = $thumbnail.find('img');

			if($thumbnailImg.data('load-error')) {
				return;
			}
			
			//modify DOM to add wrapper divs and classnames
			$thumbnail.find('a').wrap('<div class="image-wrapper"></div>');
			$thumbnailImg.addClass(outClass);

			if(! $thumbnailImg.is('[data-allow-redraw]')){
				return;
			}
			
			//duplicate and change image source
			var hoverImgSrc = $thumbnailImg.attr('src').replace(outSize,overSize);

			var $thumbnailHoverImg = $thumbnailImg
				.clone()
				.removeClass(outClass)
				.addClass(overClass + ' hidden')
				.attr('src', '')
				.insertAfter($thumbnailImg)
				.attr('src', hoverImgSrc);

			if($thumbnailImg.attr('id')) {
				$thumbnailHoverImg.attr('id', $thumbnailImg.attr('id') + '-hover');
			}
			
			//vertical centering
			_verticallyCenterThumbnail($thumbnailImg, false);
			_verticallyCenterThumbnail($thumbnailHoverImg, true);
		});

		//mouse interaction
		$thumbnails.filter(':has(img[data-allow-redraw])').on('mouseover', function() {
			$(this).find('.' + outClass).addClass('hidden');
			$(this).find('.' + overClass).removeClass('hidden');
		}).on('mouseout', function() {
			$(this).find('.' + outClass).removeClass('hidden');
			$(this).find('.' + overClass).addClass('hidden');
		});
	};

	var _verticallyCenterThumbnail = function($thumbnail, hide) {
		var src = $thumbnail.attr('src');

		$thumbnail
			.attr('src', '')
			.on('load', function(e) {
				e.preventDefault();

				var $this = $(this);

				$this.removeClass('hidden');
				var naturalHeight = $this.naturalHeight();
				var naturalWidth = $this.naturalWidth();

				var height = $this.outerHeight();
				var width = $this.outerWidth();
				if(hide) $this.addClass('hidden');

				if(naturalWidth > naturalHeight) {
					$this.addClass('landscape');

					var thumbnailHeight = $this.parent().outerHeight();

					//vertical centering
					$this.css('top', 100 * ((thumbnailHeight / 2 - height / 2) / thumbnailHeight) + '%'); 
				} else {
					$this.addClass('portrait');
				}
			})
			.attr('src', src);
	}

	
	$.fn.imageGrid = function() {
		_initThumbnailImageRollovers(this);
	};
})(jQuery);


// jQuery Natural Height/Width Plugin (not Cooper Hewitt code)
// https://gist.github.com/johan/2209957

// jQuery.naturalWidth / jQuery.naturalHeight plugin for (already-loaded) images
// Triple-licensed: Public Domain, MIT and WTFPL license - share and enjoy!

(function($) {
	function img(url) {
		var i = new Image;
		i.src = url;
		return i;
	}

	if ('naturalWidth' in (new Image)) {
		$.fn.naturalWidth  = function() { return this[0].naturalWidth; };
		$.fn.naturalHeight = function() { return this[0].naturalHeight; };
		return;
	}
	$.fn.naturalWidth  = function() { return img(this.src).width; };
	$.fn.naturalHeight = function() { return img(this.src).height; };
})(jQuery);
