/* BIND WITH DELAY
	Usage: 
	See http://api.jquery.com/bind/
	.bindWithDelay( eventType, [ eventData ], handler(eventObject), timeout, throttle )
	
	Examples:
	$("#foo").bindWithDelay("click", function(e) { }, 100);
	$(window).bindWithDelay("resize", { optional: "eventData" }, callback, 1000);
	$(window).bindWithDelay("resize", callback, 1000, true);
*/
(function($){$.fn.bindWithDelay=function(type,data,fn,timeout,throttle ){if($.isFunction(data ) ){throttle=timeout;timeout=fn;fn=data;data=undefined;}fn.guid=fn.guid||($.guid && $.guid++);return this.each(function(){var wait=null;function cb(){var e=$.extend(true,{},arguments[0]);var ctx=this;var throttler=function(){wait=null;fn.apply(ctx,[e]);};if(!throttle){clearTimeout(wait);wait=null;}if(!wait){wait=setTimeout(throttler,timeout);}}cb.guid=fn.guid;$(this).bind(type,data,cb);});}})(jQuery);