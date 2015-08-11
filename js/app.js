/*

Module name: app
Module decription:
	page entry point
Module author: Dan

*/



function check(module, module_name)
{
	/*
	
	Checks module import.

	*/
	console.log("Checking module " + module_name);
	if (!module)
	{
		console.log("Failed to load module " + module_name);
		return false;
	}
	console.log("Done!");
	return true;
}

var lib = lib || false;
var smooth_scroller = smooth_scroller || false;
var gallery = gallery || false;
var sale = sale || false;

var app = (function (self, lib, gallery, sale) {
	/*

	documentation...

	*/

	if (!check(lib, "lib"))  // checking for required modules
		return false;
	if (!check(gallery, "gallery"))
		return false;
	if (!check(sale, "sale"))
		return false;

	var gallery_left = function ()
	{
		self.images.previousSlide();
		self.images.stopScroll();
	};

	var gallery_right = function ()
	{
		self.images.nextSlide();
		self.images.stopScroll();
	};

	var footer_scroll = function ()
	{
		smooth_scroller.scrollToEnd();
	};

	self.main = function ()
	{
		console.log("Document loaded!");
		var image_count = document.getElementById("gallery").childElementCount - 2;
		self.images = new gallery.Gallery({
			id: "gallery",
			slide_count: image_count,
			vertical: false
		});
		self.images.autoScroll(5000);

		var comment_count = document.getElementById("comments").childElementCount;
		self.comments = new gallery.Gallery({
			id: "comments",
			slide_count: comment_count,
			vertical: true
		});
		self.comments.autoScroll(15000);

		var footer = document.getElementsByTagName("footer")[0];
		lib.addCrossBrowserEvent(footer, "mouseenter", footer_scroll);

		var btn_left = document.getElementById("left");
		var btn_right = document.getElementById("right");
		lib.addCrossBrowserEvent(btn_left, "click", gallery_left);
		lib.addCrossBrowserEvent(btn_right, "click", gallery_right);
		
		var links = document.getElementById("images").getElementsByTagName("a");
		for (var i = 0; i < links.length; i++)
		{
			sale.checkSale(links[i]);
		}
	};

return self;
}(app || {}, lib, gallery, sale));