<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>

<!--
	@Author Tony.Huang 
	
	1. 提供前端常用語法
	2. 將原先javascript.jsp中的部分內容改寫更適合元大使用
-->

<style>

</style>

<!-- 錯誤訊息Modal -->
<div class="modal fade" id="alertErrorModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width: 50%; margin-top: 10%">
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times; </button>
		  	<div class="alert-body"></div>
		</div>
  	</div>
</div>

<!-- 鎖定螢幕Modal -->
<div class="modal fade" id="blockModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width: 50%; opacity: 1.03;">
    	<div class="modal-content">
	      	<div class="modal-header">
	        	<h4 class="modal-title"></h4>
	      	</div>
	      	<div class="modal-body">
	        	<div class="progress">
					<div class="progress-bar progress-bar-striped active" role="progressbar"
				  		aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
				  	</div>
				</div>
	      	</div>
      	</div>
	</div>
</div>

<script type="text/javascript">
	
	/** 轉頁  */
	function toPage(url) {
		window.location = '<c:url value="/"/>' + url;
	}

	/** 將form轉為物件 */
	function toObject(selector, mapping) {
		var obj = form2js($(selector).attr('id'), '.', true, null, true);
		if (mapping) {
			mapping(obj);
		}
		return obj;
	}

	/** 將form轉為Json */
	function toJson(selector, mapping) {
		return JSON.stringify(toObject(selector, mapping));
	}
	
	/** 將編號或序號排版 */
	function leftPad(target, size, padStr) {
		var newStr = "" + target;
		for(var i = newStr.length; i < size; i++) {
			newStr = padStr + newStr;
		}
		return newStr;
	}
	
	/** 判斷此頁面是否是用彈跳視窗開啟 */
	function inIframe () {
	    try {
	        return window.self !== window.top;
	    } catch (e) {
	        return true;
	    }
	}

	/** 西元年Format */
    function adDateFormat() {
        // 對畫面上所有採用西元年LocalDate的input綁定event
        $(document.body).on('focusout', 'input[class$="format-date"]', function() {
            var $input = $(this);
            var date = moment($input.val(), ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD']);
            if(date.isValid()) { // 輸入值若符合任一種格式，則回傳java LocalDate的格式
                $input.val(date.format('YYYY-MM-DD'));
            } else { // 輸入值若不符合任一種格式，則根據情況加上提示
                var placeholder = '';
                if($input.val().trim() == '') {
//                     placeholder = '2017-01-01';
                } else {
                    placeholder = '格式錯誤';
                }
                $input.val(''); // 清空
                $input.attr('placeholder', placeholder); // 加上提示
            }
        });

        // 對畫面上所有採用西元年LocalDateTime的input綁定event
        $(document.body).on('focusout', 'input[class$="format-datetime"]', function() {
            var $input = $(this);
            var date = moment($input.val(), ['YYYY-MM-DD HH:mm:ss', 'YYYY/MM/DD HH:mm:ss', 'YYYY.MM.DD HH:mm:ss']);
            if(date.isValid()) { // 輸入值若符合任一種格式，則回傳java LocalDateTime的格式
                $input.val(date.format('YYYY-MM-DD HH:mm:ss'));
            } else { // 輸入值若不符合任一種格式，則根據情況加上提示
                var placeholder = '';
                if($input.val().trim() == '') {
//                     placeholder = '2017-01-01 12:00';
                } else {
                    placeholder = '格式錯誤';
                }
                $input.val(''); // 清空
                $input.attr('placeholder', placeholder); // 加上提示
            }
        });
    }
	
	/** 鎖住整個畫面 */
	function enblock(settings) {
		// 顯示設定(預設值)
		var options = {
			lock: true, // 是否針對form表單物件做lock, 
			modal: false, // 是否要顯示modal視窗
			title: '儲存中', // 預設'儲存中' (可自行輸入文字 ex:試算中, 檢核中...)
			loading: true, // 是否要將btn文字改為title
		}
		$.extend(options, settings); // 套用客製化設定
		
		// 隱藏modal訊息區塊
		if(options.modal === false) {
			$('#blockModal .modal-dialog').css('display', 'none'); 
			$('#blockModal').on('show.bs.modal', function (e) {
				$('div.modal-backdrop').css('opacity', 0);
			});
		} else {
			$('#blockModal .modal-dialog').css('display', 'block');
			$('#blockModal .modal-content').css('margin-top', '250px');
			$('#blockModal .modal-title').empty().text(options.title);
			$('#blockModal').on('show.bs.modal', function (e) {
				$('div.modal-backdrop').css('opacity', 0.5);
			});
		}
		
		// button loading
		var $btns = $('button:not([class*="cancel"]):not([class*="confirm"]), a[class*="btn"]');
		$btns.each(function(idx, ele) {
			$(this).data('loading-text', options.title);
		});

		if(options.loading) {
		    $btns.button('loading');
        }

		// 設定標題並顯示Modal
		$('#blockModal').modal({ backdrop: 'static' }).modal('show');
	}
	
	/** 解鎖整個畫面 */
	function deblock() {
		// button reset
		var $btns = $('button:not([class*="cancel"]):not([class*="confirm"]), a[class*="btn"]');
		$btns.each(function(idx, ele) {
			$(this).data('loading-text', '');
		});
		$btns.button('reset');
		
		// 隱藏modal
		$('#blockModal').modal('hide');
	}
	
	/** 清空欄位 (selector為jQuery物件) */
	function clearFields(selector, settings) {
		// TODO:未來提供排除input類型
		var options = {
		    excludeField : [''], // 排除的欄位
		}
		$.extend(options, settings); // 套用客製化設定
		
		// 清空input text內容
		selector.find('input[type="text"], input[type="hidden"]').each(function() {
		    if(!options.excludeField.includes($(this).attr('name'))) {
                $(this).context.value = "";
            }
		});
		// 清空input number內容(回歸0)
		selector.find('input[type="number"]').each(function() {
            if(!options.excludeField.includes($(this).attr('name'))) {
                $(this).context.value = 0;
            }
		});
		// 回復select為預設值
		selector.find('select').each(function() {
            if(!options.excludeField.includes($(this).attr('name'))) {
                $(this).val('');
            }
		});
		// 回復toggle-btn為預設值N
		selector.find('.toggle-btn').each(function() {
			if($(this).val() == 'true' && !options.excludeField.includes($(this).attr('name'))) {
				$(this).parent().find('button').trigger('click');
			}
		});
	}
	
	/** 顯示錯誤訊息 */
	function alertErrorMessage(messages) {
		$('#alertErrorModal .alert-body').empty();
		$('#alertErrorModal .alert-body').append(messages);
		$('#alertErrorModal').modal('show');
		$('#alertErrorModal').css("z-index", 99999999);
	}
	
	/* TODO:未來會慢慢優化提供更多設定 */
	/** 回傳轉換後的Messages */
	function toMessages(messages, settings) {
		// 訊息顯示設定(預設值)
		var options = {
			type: 'string', // default:'string', array(回傳陣列根據自己需求做處理)
			field: true, // 是否在欄位下方顯示錯誤訊息 (ex:報價User要，新契約User不要)
			border: true, // input框是否要顯示紅色
		};
		$.extend(options, settings); // 套用客製化設定
		
		var content = []; // 錯誤訊息陣列
		if ($.isArray(messages)) {
			$.each(messages, function() {
				if ($.isPlainObject(this)) {
					if (this.value) {
						// 取得label的內容
						var columnName = $('label[for="' + this.name + '"]').text();
						if(columnName.indexOf('＊') != -1) { // 欄位名稱排除＊
							columnName = columnName.substr(1, columnName.length);
						}
                        columnName = columnName ? columnName : (this.name ? this.name : '系統');
                        content.push('【' + columnName + '】' + this.value + '<br/>');
						
						// 找到此input的div
						var $input = $('[name="' + this.name + '"]');
						var parent = $input.parent();
						if(parent.hasClass('input-group')) { // 若為群組則需要再往上一層
							parent = $input.parent().parent();
						}
						
						// 根據設定判斷是否加上錯誤訊息在欄位中
						if(options.field === true) {
							// 若找不到則先新增顯示錯誤訊息的區塊(頁面可以不用寫)
							if(parent.find('.help-block > div').length < 1) {
								// 訊息存在時，不再append上去
								if (!parent.find("span").hasClass("help-block")) {
									parent.append('<span class="help-block"><div class="text-danger"></div></span>');
								}
							}
							parent.find(".help-block > div").html(this.value);
						}
						
						// 根據設定判斷input框是否顯示紅色
						if(options.border === true) {
							parent.addClass("has-error");
						}
					} else {
						content.push('something went wrong, please contact with system handler.');
					}
				} else {
					content.push(this + '<br/>');
				}
			});
		} else {
			content.push(messages);
		}
		
		if(options.type === 'array') {
			return content;
		} else {
			return content.join('');
		}
	}
	
	/* TODO:未來增加顯示錯誤訊息 */
	/** 顯示Ajax方法fail時的訊息 */
	function alertAjaxFail(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	}
	
</script>

<!-- 此script主要用來放IE不支援的js語法(自訂Polyfill) -->
<script>
    // String.prototype.includes()
    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }

    // Array.prototype.includes()
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function(searchElement, fromIndex) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);
                var len = o.length >>> 0;
                if (len === 0) {
                    return false;
                }

                var n = fromIndex | 0;
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
                while (k < len) {
                    if (o[k] === searchElement) {
                        return true;
                    }
                    k++;
                }
                return false;
            }
        });
    }
    
    if (!('formatMoney' in Function.prototype)) {
        /**
         * Params:
         * c = decimal places
         * d = thousend seperator
         * t = decimal seperator
         */
        Number.prototype.formatMoney = function (c, d, t) {
            var n = this,
                c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        };
    }
</script>