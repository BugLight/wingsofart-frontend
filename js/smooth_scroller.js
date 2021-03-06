/**
 * @callback Callback
 * 	@param {Object[]} [args]
 */

/**
 * Namespace contains methods for scrolling with smooth effect.
 * @namespace smooth_scroller
 */
var smooth_scroller = (function (self) {
	/**
	 * @function scrollToPosition
	 * @memberof smooth_scroller
	 *  @param {Number} target_position - X or Y coordinate
	 *  @param {Boolean} vertical - X or Y scroll
	 *  @param {Object} parent - element should be srolled
	 *  @param {Callback} [callback] - when scrolled
	 *  @param {Object[]} [args] - callback arguments
	 * @static
	 */
	self.scrollToPosition = function (target_position, vertical, parent, callback, args)
	{
		var args = args || {};
		var callback = callback || function(args){};
		if (navigator.userAgent.indexOf("Firefox") > -1)
		{
			if (vertical)
				parent.scrollTo({top: target_position, behavior: "smooth"});
			else
				parent.scrollTo({left: target_position, behavior: "smooth"});
			callback(args);
			return;
		}
		var now = vertical ? parent.scrollTop : parent.scrollLeft;
		if (target_position > now)
		{
			var j = target_position - now;
			var timer = setTimeout(function scrollForward(j) {
				if (j == 0)
				{
					callback(args);
					return;
				}
				j--;
				if (vertical)
					parent.scrollTop++;
				else
					parent.scrollLeft++;
				setTimeout(scrollForward, 0, j);
			}, 0, j);		
		}
		else
		{
			var j = now - target_position;
			var timer = setTimeout(function scrollBack(j) {
				if (j == 0)
				{
					callback(args);
					return;
				}
				j--;
				if (vertical)
					parent.scrollTop--;
				else
					parent.scrollLeft--;
				setTimeout(scrollBack, 0, j);
			}, 0, j);	
		}
	};

	/**
	 * This method ables smooth scroll to element selected by id.
		Important for Chrome! Works only in 100% scale.
	 * @function scrollToId
	 * @memberof smooth_scroller
	 *  @param {String} id
	 *	@param {Boolean} vertical
	 * 	@param {Object} parent
	 *  @param {Callback} [callback]
	 *  @param {Object[]} [args]
	 * @static
	 */
	self.scrollToId = function (id, vertical, parent, callback, args)
	{
		var args = args || {};
		var callback = callback || function(args){};
		var target = document.getElementById(id);
		if (vertical)
			var target_position = target.offsetTop;
		else
			var target_position = target.offsetLeft;
		if (target.parentElement != document.body)
		{
			if (vertical)
				target_position -= target.parentElement.offsetTop;
			else
				target_position -= target.parentElement.offsetLeft;
		}
		if (!parent)
			self.scrollToPosition(target_position, vertical, target.parentElement, callback, args);
		else
			self.scrollToPosition(target_position, vertical, parent, callback, args);
	};

	/**
	 * Scrolls to top of the page.
	 * @function scroolToHome
	 * @memberof smooth_scroller
	 * @static
	 */
	self.scrollToHome = function ()
	{
		var root = {};
		if (navigator.userAgent.indexOf("Firefox") > -1)
			root = document.documentElement;
		else
			root = document.body;
		self.scrollToPosition(0, true, root);
	};

	/**
	 * Scrolls to bottom of the page.
	 * @function scroolToEnd
	 * @memberof smooth_scroller
	 * @static
	 */
	self.scrollToEnd = function ()
	{
		var root = {};
		if (navigator.userAgent.indexOf("Firefox") > -1)
			root = document.documentElement;
		else
			root = document.body;
		self.scrollToPosition(root.clientHeight, true, root);
	};

return self;
}(smooth_scroller || {}));