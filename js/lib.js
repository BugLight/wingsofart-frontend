/**
 *
 * @callback eventHandler
 * @callback Callback
 * @param {Object} event
 *
 */

 /** @namespace lib*/
var lib = (function (self) {

	/**
	 * Creates event listener on html element in different browsers.
	 * @function addCrossBrowserEvent
	 * @memberof lib
	 *  @param {Object} el
	 *  @param {string} event_type
	 *  @param {eventHandler} handler
	 */
	self.addCrossBrowserEvent = function addCrossBrowserEvent(el, event_type, handler)
	{
		try  // Chrome, Mozila, Safari
		{
			el.addEventListener(event_type, handler, false);
		}
		catch (exeption) // IE, Opera
		{
			el.attachEvent("on" + event_type, handler);
		}
	};

	/**
	 * @class Ajax
	 * @memberof sale
	 *	@param {Object} [config] Init configuration
	 */
	self.Ajax = function (config)
	{
		var config = config || {};
		var url = "";
		var method = "";
		var callback = function (args) {};
		var xml_http_request = {};
		try
		{  // Old IE
			xml_http_request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (exception_1)
		{
			try
			{  // New IE
				xml_http_request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (exception_2)
			{  // Other browsers
				xml_http_request = new XMLHttpRequest();
			}
		}

		if (config.hasOwnProperty("url"))
			url = config.url;
		if (config.hasOwnProperty("method"))
			method = config.method;
		if (config.hasOwnProperty("callback"))
			callback = config.callback;

		if (url != "" && method != "")
		{
			xml_http_request.open(method, url, true);
		}

		xml_http_request.onreadystatechange = function ()
		{
			if (xml_http_request.readyState == 4)
			{
				callback({
					status: xml_http_request.status,
					response: xml_http_request.responseText
				});
			}
		}

		return xml_http_request;
	}

	/**
	 *
	 * @function load
	 * @memberof lib
	 * 	@param {String} url
	 *	@param {Callback} callback
	 */
	self.load = function (url, callback)
	{
		var request = new self.Ajax({
			url: url,
			method: "GET",
			callback: callback
		});
		request.send("");

	};

return self;
}(lib || {}));