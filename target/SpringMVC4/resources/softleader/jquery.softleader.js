/**
 * jQuery plugin extention
 */
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
            throw 'jquery.softleader.js requires jQuery to be loaded first';
        }
        factory(jQuery);
    }
}(function($) {
	'use strict';
	if (!jQuery) {
        throw new Error('jquery.softleader.js requires jQuery to be loaded first');
    }
	
	function _ajax_request(url, formId, success, complete, type, method) {
		if (!!$log) {
			$log.debug("http method: " + method + " submit to " + url);
		}

		var data = {};
		if (jQuery.isFunction(formId)) {
			success, complete = formId;
			formId = "";
			data = {};
		}
		if (!!!jQuery.trim(type)) {
			type = 'json';
		}
		if (!!jQuery.trim(formId)) {
			data = JSON.stringify(form2js(formId, '.', true, null, true));

			var tempData = JSON.parse(data);
			jQuery.each(jQuery("#" + formId).find("[data-content-type='array']"), function() {
				delete tempData[jQuery(this).attr("name")];
				var attrName = jQuery(this).attr("name").split("[]")[0];
				var arrayAttrName = jQuery(this).attr("name").split("[]")[1];
				eval("tempData." + attrName + "=[]");
				if (!!jQuery(this).val()) {
					jQuery.each(jQuery(this).val(), function(index, element) {
						eval("tempData." + attrName + "[" + index + "]=new Object()");
						eval("tempData." + attrName + "[" + index + "]" + arrayAttrName + "=" + element);
					});
				}
			});
			data = JSON.stringify(tempData);
		}

		if (!!$log) {
			$log.debug("submit data is " + data);
		}
		var $form = jQuery("#" + formId);

		// reset all
		$form.find(".form-group").find('span > div').empty();
		$form.find("*").removeClass("has-error has-success");
		$form.find("label").css("color", "black");

		return jQuery.ajax({
			url: url,
			type: method,
			contentType: 'application/json; charset=utf-8',
			// beforeSend: function (XMLHttpRequest) {
			// if (!!jQuery("#AllocateJavaClass").val()) {
			// XMLHttpRequest.setRequestHeader('AllocateJavaClass', jQuery("#AllocateJavaClass").val());
			// }
			// },
			dataType: type,
			data: data,
			success: success,
			error: function(jqXHR, textStatus, errorThrown) {
				if (!!$log) {
					$log.error('Error occurred during connection to server: [' + textStatus + '] ' + errorThrown + ', Please try again..');
				}
				alertMessage('Error occurred during connection to server: [' + textStatus + '] ' + errorThrown + ', Please try again..');
			},
			complete: complete
		}).done(function(data) {
			if (!!$log) {
				$log.debug("server response: " + JSON.stringify(data));
			}

			if (!!data && !!data.messages && data.messages.length > 0) {
				// add error message to help span and add error css
				jQuery.each(data.messages, function() {
					if (!!this.name) {
//						alert(this.name);
//						alert(this.value);
						$form.find('[name="' + this.name + '"]').parent().find('span.help-block > div.text-danger').html(this.value);
						var div = $form.find('[name="' + this.name + '"]').parent();
						div.addClass("has-error");
						jQuery(div).prev().addClass("has-error").css("color", "#b94a48");
					}
				});

				// add success css to dom if there's no error css found.
				if ($form.find(".has-error").length > 0) {
					$form.find(".form-group").find("div").each(function() {
						if (!jQuery(this).hasClass("has-error")) {
							jQuery(this).addClass("has-success");
							jQuery(this).prev().addClass("has-success").css("color", "#468847");
						}
					});
				}

				// show message if none column name indicated
				var nonameMsg = new Array();
				jQuery.each(data.messages, function() {
					if (!!!this.name) {
						nonameMsg.push(this.value);
					}
				});
				if (nonameMsg.length > 0) {
					alertMessage(nonameMsg);
				}
			}
		});
	}

	jQuery.extend({
		get: function(url, formId, success, complete, type) {
			return _ajax_request(url, formId, success, complete, type, 'GET');
		},
		post: function(url, formId, success, complete, type) {
			return _ajax_request(url, formId, success, complete, type, 'POST');
		},
		put: function(url, formId, success, complete, type) {
			return _ajax_request(url, formId, success, complete, type, 'PUT');
		},
		delete_: function(url, formId, success, complete, type) {
			return _ajax_request(url, formId, success, complete, type, 'DELETE');
		},
		log: function(obj) {
			if (!!console) {
				if (typeof obj == 'object') {
					console.table(obj);
				} else {
					console.log(obj);
				}
			} else {
				if (typeof obj == 'object') {
					alert(JSON.stringify(obj));
				} else {
					alert(obj);
				}
			}
		}
	});
}));
