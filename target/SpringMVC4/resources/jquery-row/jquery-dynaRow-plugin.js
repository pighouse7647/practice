/*
 * jQuery Add/Delete Row Plugin v1.0
 * Author: David Hsu
 * Date: 2011-09-20
 * 
 * History:
 * David Hsu 2011/09/20 Create;
 * David Hsu 2011/10/31 Fix 調整效能;
 * 
 */
(function($) {
	
	$.fn.extend({
		
		//新增列
		addRow : function(options) {
			return this.each(function() {
				
				var settings = {tarObj:null, maxCount:1, filter:"N", afterCheckbox:true};
				$.extend(settings, options);
				
				var tbody = $(this).find("tbody:first");
				var total = tbody.find("input[type=checkbox]:checked").length;
				// alert(total);
				// 比對, 勾選特定某列, 可以特定列後面插入
			    // 如果沒勾或全勾, 則從最後面插入
				if (total == 1 && settings.afterCheckbox) {
					$.each($("tbody > tr").find("input[type=checkbox]:checked"), function () {
						// alert($(this).parents('tr:eq(0)').find('td:nth-child(2)').text());
						$(this).parents('tr:eq(0)').after(tbody.children("tr:hidden").clone().css("display",""));
					});
					// 重編序號
					tbody.children("tr:visible").each(function(index) {
						$(this).find('td:nth-child(2)').html((index + 1));
					});
				} else {
					tbody.children("tr:last").after(tbody.children("tr:hidden").clone().css("display",""));
					var index = tbody.children("tr:visible").length - 1;
					tbody.find('tr:eq('+ (index + 1)+')').find('td:nth-child(2)').html((index + 1));
				}
				
				
//				//無指定插入點且每列等於1組
//				if(settings.tarObj == null && settings.maxCount == 1) { 
//					tbody.children("tr:last").after(tbody.children("tr:hidden").clone().css("display",""));
//					var index = tbody.children("tr:visible").length - 1;
//					
//					//replace index
//					replaceIndex(index, tbody.children("tr:last"), settings.filter);
//					
//					tbody.find('tr:eq('+ (index + 1)+')').find('td:nth-child(2)').html((index + 1));
//					
//					return;
//				}
//				else if(settings.tarObj == null) {	//無指定插入點且每列大於1組
//					tbody.children("tr:last").after(tbody.children("tr:hidden").clone().css("display",""));
//				}
//				else if(settings.maxCount == 1) {	//有指定插入點且每列等於1組
//					var allCol = tbody.children("tr:visible");
//					var index = allCol.index($(settings.tarObj).parent());
//					allCol.eq(index).after(tbody.children("tr:hidden").clone().css("display",""));
//				}
//				else {	//有指定插入點且每列大於1組
//					var allCol = tbody.children("tr:visible").children("td:visible");
//					var count = tbody.children("tr:hidden").children("td:hidden").length;
//					var index = allCol.index(settings.tarObj);
//					var i = index % count;
//					allCol.eq(index + count - (i+1)).after(tbody.children("tr:hidden").clone().css("display","").html());
//				}
//			
//				refresh(tbody, settings.maxCount, settings.filter);
			
			});
		},
		
		//刪除列
		deleteRow : function(options) {
			
			var settings = {maxCount:1, minCount:1, filter:"N"};
			$.extend(settings, options);
			
			var tbody = $(this).parents("tbody:first");
			var count = tbody.children("tr:hidden").children("td:hidden").length;
			
			this.each(function() {
				//超過minCount以上才可移除
				if((tbody.children("tr:visible").children("td:visible").length / count) > settings.minCount) {
					if(settings.maxCount == 1) {	//每列1組
						
						// 全選
						if ($(this).parents("thead").find("[id=checkAll]").prop('checked')) {
							// 從第二列開始刪除, 避免theader被刪掉
							$(this).parents("tr:nth-child(2)").remove();
						} else {
						// 勾選某一列
							$(this).parents("tr:first").remove();
						}
					}
					else {
						var allTd = tbody.children("tr:visible").children("td:visible");
						var index = allTd.index(this);
						var range = index % count;
						allTd.slice(index-range, index+count-range).remove();
					}
				}
			});
			
			// 重編序號
			tbody.children("tr:visible").each(function(index) {
 				$(this).find('td:nth-child(2)').html((index + 1));
			});
			// return refresh(tbody, settings.maxCount, settings.filter);
		},
		
		refreshRow : function(options) {
			
			this.each(function() {
				var settings = {maxCount:1, filter:"N"};
				$.extend(settings, options);
				var tbody = $(this).find("tbody:first");
				refresh(tbody, settings.maxCount, settings.filter);
			});
		},
		
		/*2011.11.05.add by Charles*/
		copyRow : function(options) {
			
			var settings = {maxCount:1, minCount:1, filter:"N"};
			$.extend(settings, options);
			
			var tbody = $(this).parents("tbody:first");
			var count = tbody.children("tr:hidden").children("td:hidden").length;
		
			this.each(function() {
				tbody.children("tr:last").after($(this).parent().clone().css("display",""));
			});
			
			return refresh(tbody, settings.maxCount, settings.filter);
		},
		
		checkAll : function() {
			$('tbody tr:not(:first-child) td input[type="checkbox"]').prop('checked', $("#checkAll").prop('checked') ? true : false);
		}
		
	});
	
	function refresh(tbody, maxCount, filter) {
		
		//每列只有一組只須refresh index
		if(maxCount == 1) {
			tbody.children("tr:visible").each(function(i){
				replaceIndex(i, this, filter);
			});
		}
		else {	//每列超過一組則須refresh index + columun
			var allCol = tbody.children("tr:visible").children("td:visible");
			var num = tbody.children("tr:hidden").children("td:hidden").length;
			var count = 0;
			var x = 1;
			$.each(allCol, function(i, obj) {
				
				replaceIndex(count, obj, filter);
				
				tbody.children("tr:eq("+x+")").append(obj);
				
				//判斷是否該換列
				if((i+1)%num == 0 && ++count % maxCount == 0) {
					tbody.children("tr:last").after(tbody.children("tr:hidden").clone().css("display","").html(""));
					x++;
				}
				
			});	
			removeTr(tbody);
		}
		
	}
	
	function replaceIndex(i, obj, filter) {
		
		//避免value中含有[\d]這種值,先把原始value存起來,	2011/10/31影響效能:增加filter參數
		if(filter == "Y") {
			var origVals = new Array();
			$(obj).find("input").each(function(i) {
				origVals[i] = $(this).val();
			});
		}
		
		//replace index
		var newHtml = $(obj).html().replace(/\[\d\]/g, "["+(i+1)+"]").replace(/\/\d\|/g, "/"+(i+1)+"|");
		$(obj).html(newHtml);
		
		//把真正的value取代回去,	2011/10/31影響效能:增加filter參數
		if(filter == "Y") {
			$(obj).find("input").each(function(i) {
				$(this).val(origVals[i]);
			});
		}
	}
	
	function removeTr(tbody) {
		
		//清除空的tr
		//tbody.children("tr:empty").remove();
		tbody.children("tr:visible").each(function(i) {
			if($(this).children().length == 0) {
				$(this).remove();
			}
		});
		
	}
	
})(jQuery);