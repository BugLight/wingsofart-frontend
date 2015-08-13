/**
 * 
 * @namespace sale
 */
var sale = (function (self, lib) {
	if (!lib)
	{
		console.log("Failed to load lib!");
		return {};
	}

	/**
	 * 
	 * @function makeSale
	 * @memberof sale
	 * 	@param {Object} el
	 */
	self.makeSale = function makeSale(el)
	{
		var template = document.createElement("span");
		template.setAttribute("class", "sale");
		template.innerHTML = "скидка";
		el.appendChild(template);
	};

	/**
	 *
	 * @function checkSale
	 * @memberof sale
	 * 	@param {String} url
	 * @returns {Boolean} Is there sale
	 */
	self.checkSale = function checkSale(link)
	{
		var url = link.getAttribute("href");
		var template = "акция";
		lib.load(url, function (args)
		{
			var page = args.response;
			if (page.toLowerCase().indexOf(template) > -1)
			{
				self.makeSale(link);
			}
		});
	};
return self;
}(sale || {}, lib || false));