;
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD is used - Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        // Neither AMD nor CommonJS used. Use global variables.
        if (typeof jQuery === 'undefined') {
            throw 'jquery.softleader.cookie.js requires jQuery to be loaded first';
        }
        factory(jQuery);
    }
}(function($){
	'use strict';
	if (!jQuery) {
        throw new Error('jquery.softleader.cookie.js requires jQuery to be loaded first');
    }
	
	var COOKIE_NAME = "softleader-harvard-mes-signin";
	
	$.fn.cookieMe = function() {
		var $root = $(this);
		if(!!!$root.attr("id")) {
			alert('cookie DOM must declare id');
		} else {
			var value = JSON.stringify(form2js($root.attr("id"), '.', true, null, true));
			$.cookie(COOKIE_NAME, value, {
				 json:true
			});
		}
	};
	
	$.fn.loadMyCookie = function(){
		var $root = $(this);
		if(!!!$root.attr("id")) {
			alert('cookie DOM must declare id');
		} else {
			try {
				var cookie = $.cookie(COOKIE_NAME);
				if(!$.isEmptyObject(cookie)) {
					JSON.parse(cookie, function(key, value) {
						if (!!key){
							var $el = $root.find('[name="'+key+'"]');
							if (!!$el && $el.length>0) {
								if ($el.attr('type') == 'checkbox') {
									$el.attr('checked', value == 'on' ? true : false);
								} else {
									$el.val(value);
								}
							}
						}
					});
				}
			} catch(e) {
				$.cookie(COOKIE_NAME, null);
			}
		}
	}
	
	$.fn.removeMyCookie = function() {
		$.cookie(COOKIE_NAME, null);
	}
}));