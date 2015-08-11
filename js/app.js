/**
 * Main application namespace
 * @namespace app
 */
var app = {

	gallery_left: function ()
	{
		app.gallery.previousSlide();
	},

	gallery_right: function ()
	{
		app.gallery.nextSlide();
	},

	footer_scroll: function ()
	{
		smooth_scroller.scrollToEnd();
	},

	form_check: function () {
		return jc_chkscrfrm(this, false, false, false, false);
	},

	/**
	 * Called when document loaded
	 * @function main
	 */
	main: function ()
	{
		console.log("Document loaded!");

		var image_count = document.getElementById("gallery").childElementCount - 2;
		this.gallery = new Gallery({
			id: "gallery",
			slide_count: image_count,
			vertical: false
		});
		this.gallery.autoScroll(10000);

		var comment_count = document.getElementById("comments").childElementCount;
		this.comments = new Gallery({
			id: "comments",
			slide_count: comment_count,
			vertical: true
		});
		this.comments.autoScroll(15000);

		var footer = document.getElementsByTagName("footer")[0];
		lib.addCrossBrowserEvent(footer, "mouseenter", this.footer_scroll);

		var btn_left = document.getElementById("left");
		var btn_right = document.getElementById("right");
		lib.addCrossBrowserEvent(btn_left, "click", this.gallery_left);
		lib.addCrossBrowserEvent(btn_right, "click", this.gallery_right);
		
		var links = document.getElementById("gallery").getElementsByTagName("a");
		for (var i = 0; i < links.length; i++)
		{
			sale.checkSale(links[i]);
		}

		var subcribe = document.getElementById("subscr-form-7196");
		lib.addCrossBrowserEvent(subcribe, "submit", this.form_check);
	}
};