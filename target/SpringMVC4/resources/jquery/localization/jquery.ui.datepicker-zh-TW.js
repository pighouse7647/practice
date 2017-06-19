/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Ressol (ressol@gmail.com). */
jQuery(function($) {
	$.datepicker.regional['zh-TW'] = {
		closeText : '關閉',
		prevText : '&#x3C;上月',
		nextText : '下月&#x3E;',
		currentText : '今天',
		monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
				'十月', '十一月', '十二月' ],
		monthNamesShort : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',
				'九月', '十月', '十一月', '十二月' ],
		dayNames : [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
		dayNamesShort : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
		dayNamesMin : [ '日', '一', '二', '三', '四', '五', '六' ],
		weekHeader : '周',
		dateFormat : 'yy-mm-dd',
		firstDay : 1,
		isRTL : false,
		showMonthAfterYear : true,
		yearSuffix : '',
 		changeMonth : true,
 		changeYear : true,
 		yearRange : '-100:+30',
		formatDate: function (format, value, settings) {
			if (!!!value) {
				return "";
			}
			var d = value.getDate();
			var m = value.getMonth()+1;
			var y = value.getFullYear();			
			var fm = function(v){			
			    return (v < 10 ? '0' : '') + v;
			};
			var ry = (y - 1911);
			if(ry<100){
				ry = "0"+ry;
			}
			return ry +'-'+ fm(m) +'-'+ fm(d);
		},
		setDateFromField: function(inst, outter) {
			if (inst.input.val() === inst.lastVal || !!!!inst.input.val()) {
				return;
			}
			var dateFormat = outter._get(inst, 'dateFormat');  
			var dates = inst.input ? inst.input.val() : null;
			var date = defaultDate = outter._getDefaultDate(inst);  
			var settings = outter._getFormatConfig(inst);
			if (!!dates) {
				inst.endDay = inst.endMonth = inst.endYear = null;  
				try {  
					var dateArr = dates.split("-");  
					var year = parseInt(dateArr[0], 10) + 1911;  
					var month = parseInt(dateArr[1], 10) - 1;  
					var day = parseInt(dateArr[2], 10);  
					date = new Date(year, month, day);  
				} catch (event) {
					outter.log(event);  
				    date = defaultDate;
				}  
				inst.selectedDay = date.getDate();  
				inst.drawMonth = inst.selectedMonth = date.getMonth();  
				inst.drawYear = inst.selectedYear = date.getFullYear();  
				inst.currentDay = (dates ? date.getDate() : 0);  
				inst.currentMonth = (dates ? date.getMonth() : 0);  
				inst.currentYear = (dates ? date.getFullYear() : 0);  
			}
			outter._adjustInstDate(inst);
		},
		parseDate: function(format, value, settings) {
			if (!!value) {
				var v = new String(value); 
		    	var Y,M,D;
		    	var splitValue = v.split("-");
		    	Y = splitValue[0] - 0 + 1911;
		    	M = splitValue[1] - 1;
		    	D = splitValue[2] - 0;
		    	return (new Date(Y,M,D));
			}
			return new Date();
		},
		formatYear: function(value) {
			return value - 1911;
		},
		altFieldFormat: function(format, value, settings) {
			if (!!!value) {
				return "";
			}
			var d = value.getDate();
			var m = value.getMonth() + 1;
			var y = value.getFullYear();
			var fm = function(v){			
			    return (v < 10 ? '0' : '') + v;
			};
			return (y) +'-'+ fm(m) +'-'+ fm(d);
		}
	};

});
