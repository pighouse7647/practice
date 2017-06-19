/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Ressol (ressol@gmail.com). */
jQuery(function($) {
	var _dateSpliter = "/";
	$.datepicker.regional['zh-TW-ROC'] = {
		closeText : '關閉',
		prevText : '&#x3C;上月',
		nextText : '下月&#x3E;',
		currentText : '今天',
		monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月','十月', '十一月', '十二月' ],
		monthNamesShort : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月','九月', '十月', '十一月', '十二月' ],
		dayNames : [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
		dayNamesShort : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
		dayNamesMin : [ '日', '一', '二', '三', '四', '五', '六' ],
		weekHeader : '周',
		dateFormat : 'yy' + _dateSpliter + 'mm' + _dateSpliter + 'dd',
		firstDay : 1,
		isRTL : false,
		showMonthAfterYear : true,
		yearSuffix : '',
		changeMonth : true,
 		changeYear : true,
 		yearRange : '-100:+30',
 		showButtonPanel : true,
		formatDate: function (format, value, settings) {
			/**/ //console.log("formatDate : " + format + "," + value);
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
//			if(ry<100){
			if (ry < 10) {
				ry = "0" + ry;
			}

			var dateStr = ry + _dateSpliter + fm(m) + _dateSpliter + fm(d);
			/**/ //console.log("dateStr : " + dateStr);
			return dateStr;
		},
		setDateFromField: function(inst, outter) {
			/**/ //console.log("setDateFromField : " + inst.input.val() + "," + inst.lastVal + "," + !!!!inst.lastVal );
			/**/ //console.log("inst.input.length : " + inst.input.val().length );
//			if (inst.input.val() === inst.lastVal || !!!!inst.input.val()) {
			if (inst.input.val() === inst.lastVal || !!!!inst.input.val()) {
				if (inst.input.val().length >= 10) {
					// skip return
				}else{
					/**/ //console.log("return : " + true );
					return;
				}
			}
			var dateFormat = outter._get(inst, 'dateFormat');  
			var dates = inst.input ? inst.input.val() : null;
			var date = defaultDate = outter._getDefaultDate(inst);  
			var settings = outter._getFormatConfig(inst);
			
			if (!!!dates) {
				var now = new Date();
				dates = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
			}
			/**/ //console.log("dates : " + dates );
			/**/ //console.log("defaultDate : " + defaultDate );
			if (!!dates) {
				inst.endDay = inst.endMonth = inst.endYear = null;  
				try { 
					var dateArr = dates.split("-");
					var year = parseInt(dateArr[0], 10);  
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
				/**/ //console.log(inst);
			}
			
			outter._adjustInstDate(inst);
		},
		parseDate: function(format, value, settings) {
			/**/ //console.log("parseDate");
			if (!!value) {
				var v = new String(value); 
		    	var Y,M,D;

		    	var splitValue = v.split(_dateSpliter);
		    	Y = splitValue[0] - 0 + 1911;
		    	M = splitValue[1] - 1;
		    	D = splitValue[2] - 0;
		    	return (new Date(Y,M,D));
			}
			return new Date();
		},
		formatYear: function(value) {
			return value - 1911 + '年';
		},
		altFieldFormat: function(format, value, settings) {
			/**/ //console.log("altFieldFormat : " + format + "," + value);
			if (!!!value) {
				return "";
			}
			var d = value.getDate();
			var m = value.getMonth() + 1;
			var y = value.getFullYear() - 1911;			
			var fm = function(v){			
			    return (v < 10 ? '0' : '') + v;
			};

			return (y) + '-' + fm(m) + '-' + fm(d);
		}

	};

});
