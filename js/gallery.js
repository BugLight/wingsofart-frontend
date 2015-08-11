/*

TODO:
	- Make gallery class DONE
	- Make usable constructors

*/

var smooth_scroller = smooth_scroller || false;

/** @namespace gallery*/
var gallery = (function (self, smooth_scroller) {
	/*
	Module classes:
		Gallery:
			public:
				autoScroll(delay) | returns timer_id
				nextSlide()
				previousSlide()
	Module functions: - in progress
		createGalleryWidget() - feauture
		initGalleryFromObject(id, slides, vertical) | returns gallery_instance
	Module variables:
		--
	Module dependencies:
		smooth_scroller

	*/


	if (!smooth_scroller)
	{
		console.log("Failed to load smooth_scroller!");
		return {};
	}

	/**
	 * @class Gallery
	 * @memberof gallery
	 *  @param {Object} config Init configuration
			@param {String} [config.id]
			@param {Number} config.slide_count
			@param {Boolean} config.vertical
	 */
	self.Gallery = function (config)
	{
		var config = config || {};

		if (config.hasOwnProperty("slide_count"))
			/** @member {Number} gallery.Gallery.slide_count
 			 * @instance
			 */
			this.slide_count = config.slide_count;
		else
			throw new Error("Configuration is incorrect!");
		if (config.hasOwnProperty("vertical"))
			/** @member {Boolean} gallery.Gallery.vertical
			 * @instance
			 */
			this.vertical = config.vertical;
		else
			throw new Error("Configuration is incorrect!");

		if (config.hasOwnProperty("id"))
		{
			/** @member {String} gallery.Gallery.id
			 * @instance
			 */
			this.id = config.id;
		}
		else
		{

		}

		/** @member {Number} gallery.Gallery.slide
		 * @instance
		 */
		this.slide = 1;
		/** @member {Number} gallery.Gallery.timer
 		 * @instance
		 */
		this.timer = null;
		/** @member {Boolean} gallery.Gallery.forward
		 * @instance
		 */
		this.forward = true;
		/**
		 * @member {Boolean} gallery.Gallery.scrolling
		 * @instance
		 */
		 this.scrolling = false;

		/**
		 * Changes direction, the slides following.
		 * @function changeDirection
		 * @memberof gallery.Gallery
		 * @instance
		 */
		this.changeDirection = function ()
		{
			this.forward = !this.forward;
		};

		/**
		 * Changes direction if reached end of slides.
		 * @function changeDirectionIfNeeded
		 * @memberof gallery.Gallery
		 * @instance
		 */
		this.changeDirectionIfNeeded = function ()
		{
			if (this.slide == this.slide_count)
				this.forward = false;
			if (this.slide == 1)
				this.forward = true;
		};

		/**
		 * If gallery is auto scrolling, then stops.
		 * @function stopScroll
		 * @memberof gallery.Gallery
		 * @instance
		 */
		this.stopScroll = function ()
		{
			if (this.timer != null)
				clearTimeout(this.timer);
		};

		/**
		 * Returns dom object of gallery.
		 * @function getDom
		 * @memberof gallery.Gallery
		 * @returns {Object} Dom object of gallery
		 * @instance
		 */
		this.getDom = function () {
			return document.getElementById(this.id);
		}

		/**
		 * Starts scrolling slides in gallery.
		 * @function autoScroll
		 * @memberof gallery.Gallery
		 *  @param {Number} delay Time between slides
		 * @returns {Number} Timer id
		 * @instance
		 */
		this.autoScroll = function (delay)
		{
			this.timer = setTimeout(function slide(gallery_obj) {
				if (gallery_obj.scrolling)
				{
					setTimeout(slide, delay, gallery_obj);
					return;
				}
				gallery_obj.scrolling = true;	
				if (gallery_obj.forward)
					gallery_obj.slide++;
				else
					gallery_obj.slide--;
				gallery_obj.changeDirectionIfNeeded();

				args = {
					slide: slide,
					delay: delay, 
					gallery_obj: gallery_obj
				};  // for recurcive callback
				var next = gallery_obj.id + "-" + gallery_obj.slide.toString();
				smooth_scroller.scrollToId(next, gallery_obj.vertical, gallery_obj.getDom(), function(args) {
					setTimeout(
						args.slide, 
						args.delay,
						args.gallery_obj
					);
					args.gallery_obj.scrolling = false;
				}, args);
					
			}, delay, this);
			return this.timer;
		};

		/**
		 * Scrolls to next slide.
		 * @function nextSlide
		 * @memberof gallery.Gallery
		 * @returns {Boolean} Success
		 * @instance
		 */
		this.nextSlide = function ()
		{
			if (this.slide + 1 > this.slide_count || this.scrolling)
				return false
			this.scrolling = true;
			this.slide++;
			var id_next = this.id + "-" + this.slide.toString();
			console.log(id_next);
			smooth_scroller.scrollToId(id_next, this.vertical, this.getDom(), function(args) {
				args.gallery_obj.changeDirectionIfNeeded();
				args.gallery_obj.scrolling = false;
			}, {gallery_obj: this});
			return true;
		};

		/**
		 * Scrolls to previous.
		 * @function previousSlide
		 * @memberof gallery.Gallery
		 * @return {Boolean} Success
		 * @instance
		 */
		this.previousSlide = function ()
		{
			if (this.slide - 1 < 1 || this.scrolling)
				return false
			this.scrolling = true;
			this.slide--;
			var id_next = this.id + "-" + this.slide.toString();
			smooth_scroller.scrollToId(id_next, this.vertical, this.getDom(), function(args) {
				args.gallery_obj.changeDirectionIfNeeded();
				args.gallery_obj.scrolling = false;
			}, {gallery_obj: this});
			return true;
		};
	};

return self;
}(gallery || {}, smooth_scroller));