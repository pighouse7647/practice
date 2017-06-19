
/**
 * @Author Thomas.Chen
 * Abstract CkEditor Factory
 */
var sfEditorBuilder = (function () {
	// private
	var types = {};
	
	// public
	return {
		// setter
		regist: function (type, Editor) {
			var proto = Editor.prototype;
			types[type] = Editor; 
			return this;
//			return sfEditorBuilder;
		},
		// decorators.. 
//		setEditor: function(type) {
//			return this;
//		},
	
		// getter	
		get: function (type, options) {
			var Editor = types[type];
			return (Editor ? new sfEditor(options) : null);
		}
	};
})();

function sfEditor(options) {
	// 外框
	this.del_pkg_id = options.del_pkg_id || "clause_package${myIndex.count}"; 
	this.del_pkg_class = options.del_pkg_class || 'col-lg-10 col-lg-offset-2'; 
	
	// 刪除按鈕
	this.del_btn_id =  options.del_btn_id  || 'delete' + '${myIndex.count }';
	this.del_btn_text = options.del_btn_text || '刪除條款'; 
	this.del_btn_dest = options.del_btn_dest || 'http://localhost:8080/softleader-hydrogen/login';
	this.del_btn_class = options.del_btn_class || 'btn-danger';
	
	// 項目標題
	this.title_lab_text = options.title_lab_text || '條款內容'; 
	this.title_lab_class = options.title_lab_class || 'col-lg-2 control-label'; 
	
	// 項目內容
	this.content_area_text = options.content_area_text || '輸入項目內容...';
	this.content_area_id = options.content_area_id || 'clauseContent';
	this.content_area_rows = options.content_area_rows || '6'; 
	this.content_area_cols = options.content_area_cols || '70'; 
	this.content_area_name = options.content_area_name || 'clauseContents[1].clauseContent'; 
	this.content_area_class = options.content_area_class || 'col-lg-5'; 
	
	
	this.build = function() {
		
		
		var editor = $('<div></div>').addClass('form-group row')
		
				// 為了把可能刪除的東西先框起來 的標籤
				.append($('<div></div>').addClass(options.del_pkg_class).attr({'id': options.del_pkg_id}).addClass('col-lg-10 col-lg-offset-2')
				// 刪除按鈕  -- div button
				.append($('<div></div>').addClass('input-group').append($('<button></button>').attr({'id': options.del_btn_id, 'type': 'button'}).addClass(options.del_btn_class).append($('<div></div>').text(options.del_btn_text))))
				// 項目標題  -- label
//				.append($('<label></label>').attr('for', 'typeName').text(options.title_lab_text[0]).addClass(options.title_lab_class).prepend($('<span></span>').css('color', 'red').text('＊')))
				// 項目內容  -- textarea 
				.append($('<div></div>').addClass(options.content_area_class[0]).append($('<textarea></textarea>').attr({
					'rows' : options.content_area_rows[0],
					'cols' : options.content_area_cols[0],
					'name' : options.content_area_name[0],
					'placeholder' : options.content_area_text[0],
					'id' : options.content_area_id[0]
					
					
				}))
				
				.append($('<span></span>').addClass('help-block').append($('<div></div>').addClass('text-danger')))
				
				)
				// 另一個
				// 項目標題 2 -- label
//				.append($('<label></label>').attr('for', 'typeName').text(options.title_lab_text[1]).addClass(options.title_lab_class).prepend($('<span></span>').css('color', 'red').text('＊')))
				// 項目內容 2 -- textarea 
				.append($('<div></div>').addClass(options.content_area_class[1]).append($('<textarea></textarea>').attr({
					'rows' : options.content_area_rows[1],
					'cols' : options.content_area_cols[1],
					'name' : options.content_area_name[1],
					'placeholder' : options.content_area_text[1],
					'id' : options.content_area_id[1]
					
					
				}))
				
				.append($('<span></span>').addClass('help-block').append($('<div></div>').addClass('text-danger')))
				
				)
				);


		console.log('刪除標籤' + options.del_pkg_id)
		console.log('刪除按鈕' + options.del_btn_id)
		
		
		
		
		
		return editor;
		
	}
}



//註冊一個sfEditor (因為要在條款編輯使用, 所以取名 clauseEdit)
sfEditorBuilder.regist('clauseEdit', sfEditor);
//註冊一個sfEditor (因為要在條款編輯使用, 所以取名 clauseAdd)
sfEditorBuilder.regist('clauseAdd', sfEditor);





/* 20160811 User 希望能每30字段行 */
function addNewLine(unformatAddress) {
	// trim all spaces 將空格吃掉 準備重新排版
	unformatAddress = unformatAddress.replace(/(?:\r\n|\r|\n)/g,'');
	var claim_location = unformatAddress;
	var claim_location_newline = '';
	var claim_length = claim_location.length;
	var claim_index = 0;

	// 		// 原本就小於等於31
	if (claim_length <= 31) {
		claim_location_newline = claim_location;
	}

	// 		// 原本就大於31 
	while (claim_length > 31) {
		claim_location_newline += claim_location.substring(claim_index, claim_index + 30) + '\n';
		claim_length -= 30;
		claim_index += 30;
		// 			// 最後一次
		if (claim_length <= 31) {
			claim_location_newline += claim_location.substring(claim_index);
		}
	}

	return claim_location_newline;

}



/**
 * @Author Thomas.Chen
 * Abstract table Factory
 */
// 1. Builder
var tableBuilder = (function () {
	// private
	var types = {};
	
	// public
	return {
		// setter
		regist: function (type, Table) {
			var proto = Table.prototype;
			types[type] = Table; 
			return this;
//			return sfEditorBuilder;
		},
		// decorators.. 
//		setEditor: function(type) {
//			return this;
//		},
	
		// getter	
		get: function (type, options) {
			var Table = types[type];
			return (Table ? new PLANTABLE(options) : null);
		}
	};
})();


// 2. Object
function PLANTABLE(options) {
	
	
	
	// 表頭內容
	this.tHCs = options.tHCs || $('<th></th>').append($('<input>').attr("type", "checkbox"));
	// 表身內容
	this.tBCs = options.tBCs || $('<td></td>').append($('<input>').attr("type", "checkbox"));
	// tableID (畫面上有兩個table時需要此id作辨別)
	this.tableId = options.tableId || 'default_table_id';
	// 表頭顏色
	this.thead_color = options.thead_color || 'warning';
	
	// setter
	/* 一維陣列 */
	this.setTHCs = function(tHCs) {
		this.tHCs = tHCs;
		return this;
	}
	
	/* 二維陣列 */
	this.setTBCs = function(tBCs) {
		this.tBCs = tBCs;
		return this;
	}
	
	this.setTableId = function(tableId) {
		this.tableId = tableId;
		return this;
	}
	
	this.setHead_color = function(thead_color) {
		this.thead_color = thead_color;
		return this;
	}
	
	
	this.build = function() {
		
		/** declare */
		// 表格最外框
		var table = $('<table></table>').attr({'id': this.tableId}).addClass("table table-bordered table-hover table-responsive");
		
		// 表頭
		var table_head = $('<thead></thead>').addClass("thead-inverse");
		// 表頭內容 
		var table_head_content = $('<tr></tr>').addClass(this.thead_color).append(this.tHCs);
		
		// 表身
		var table_body = $('<tbody></tbody>');
		// 表身內容 (擴充為2D)
		/* 判斷一共有幾個rows*/
		var table_body_contents = {};
		table_body_contents.rows =[];
		
		// 逐一包裝 外部傳進來的二維陣列tBCs (加上<tr>) 
		for(var i =0; i < this.tBCs.rows.length; i++) {
			 table_body_contents.rows.push($('<tr></tr>').append(this.tBCs.rows[i]));
		}
	
		
		
		/** set */
		// 塞表頭內容
		table_head.append(table_head_content);
		// 塞表頭
		table.append(table_head);
		
		
		// 塞表身內容
		for(var j = 0; j < table_body_contents.rows.length; j++) {
			// 逐一將 rows 內的array抽出, 再逐row插入到tbody中
			table_body.append(table_body_contents.rows[j]);
		}
		
		
		
		// 塞表身
		table.append(table_body);
		
		return table;
	}
}


// 3. 註冊
tableBuilder.regist('planTable', PLANTABLE);


/**
 * @Author Thomas.Chen
 * Abstract select option Factory
 */
// 1. Builder
var selectOpBuilder = (function () {
	// private
	var types = {};
	
	// public
	return {
		// setter
		regist: function (type, SelectOp) {
			var proto = SelectOp.prototype;
			types[type] = SelectOp; 
			return this;
//			return sfEditorBuilder;
		},
	
		// getter	
		get: function (type, options) {
			var SelectOp = types[type];
			return (SelectOp ? new SELECTOPTIONS(options) : null);
		}
	};
})();

//2. Object
function SELECTOPTIONS(options) {
	// 最外圍的 class, 暫時稱為level_1_class 
	this.level_1_class = options.level_1_class || "input-group input-group-sm col-lg-12";
	this.level_2_class = options.level_2_class || "form-control";
	// <option></option>
	// <option></option>
	// <option></option>
	// ...
	this.options_ele = options.options_ele || ["A, 健康險", "B, 傷害險", "C, 意外險"];
	
	// setter
	/** 示範了setter的使用方式, 可以在builder的getBuilder之後(此時已經把options交出去), 動態地在執行期修改想要的設定.  */
	this.setLevel_1_class = function(level_1_class) {
		this.level_1_class = level_1_class;
		return this;
	}
	
	// build 
	this.build = function() {
		
		/** this.options_ele 為一維陣列時, 內容為 "val, text" 成對出現. */
		var options_ele_array = {};
		options_ele_array.ele = [];
		for(var i = 0; i< this.options_ele.length; i++) { 
			options_ele_array.ele.push($('<option></option>').val(this.options_ele[i].split(",")[0]).text(this.options_ele[i].split(",")[1]));
//			console.log(options_ele_array)
//			console.log(options_ele_array.ele)
		}
		
		
		return $('<div></div>').addClass(this.level_1_class).append($("<select></select>").addClass(this.level_2_class).append(options_ele_array.ele));
		
	}
}
// 命名 car, CAR
//3. 註冊
selectOpBuilder.regist('selectOptions', SELECTOPTIONS);




/**
 * @Author Thomas.Chen
 * Abstract Button Factory
 */
//1. Builder
var abstractButtonFactory = (function () {
	
	var types = {};
	
	return {
		// getter
		get: function (type, options) {
			var Button = types[type];
			return (Button ? new Button(options) : null);
		},
		
		// setter -- 目前沒有檢查吃進來的obj is kind of Button
		regist: function (type, Button) {
			var proto = Button.prototype;
			types[type] = Button; 
			return abstractButtonFactory;
		}
		
	};
})();
//2. Object
function BUTTON(options) {
	this.btnType = options.btnType || 'editType';
	this.options = options.options || '';
	this.oldTypeId = options.oldTypeId || ''; 
	this.userId =  options.userId  || '1';
	this.destination = options.destination || 'http://localhost:8080/softleader-azalea-marine-cki/insure/cargo/group/list';
	this.role = options.role || 'GUEST';
	this.btnTxt = options.btnTxt = options.btnTxt || '';
	this.btnClass = options.btnClass || 'btn btn-default';
	this.btnId = options.btnId || '';
	this.hyperLink = options.hyperLink || '#';
	this.isNormalButton = options.isNormalButton || false;
	this.btnMargin = options.btnMargin || '2px';
	this.ajaxType = options.ajaxType || 'get';
	this.ajaxFormId = options.ajaxFormId || '';
	
	
	this.setDestination = function(destination) {
		this.destination = destination;
		return this;
	}
	
	
	this.setRole = function(role) {
		this.role = role;
		return this;
	}
	
	this.setBtnTxt = function(btnTxt) {
		this.btnTxt = btnTxt;
		return this;
	}
	
	
	this.setBtnClass = function(btnClass) {
		this.btnClass = btnClass;
		return this;
	}
	
	this.setBtnId = function(btnId) {
		this.btnId = btnId;
		return this;
	}
	
	this.setHyperLink = function(hyperLink) {
		this.hyperLink = hyperLink;
		return this;
	}
	// 每種按鈕都有三種後續事件: 1. Ajax 2. Form 3. 純前端事件 
	// isNormalButton若為第3. 種, 則設定為true. 其他false
	this.setIsNormalButton = function(isNormalButton) {
		this.isNormalButton = isNormalButton;
		options.isNormalButton = isNormalButton;
		return this;
	}
	this.setBtnMargin = function(btnMargin) {
		this.btnMargin = btnMargin;
		return this;
	}
	this.setAjaxType = function(ajaxType) {
		this.ajaxType = ajaxType;
		return this;
	}
	this.setAjaxFormId = function(ajaxFormId) {
		this.ajaxFormId = ajaxFormId;
		return this;
	}
	this.build = function() {
		var button = $('<button></button>').css('margin', this.btnMargin).prop({"type": "button", 'id': this.btnId}).addClass(this.btnClass).text(this.btnTxt);
		/** 因為button的call back裡面不能使用this關鍵字, 所以要把this.hyperLink的值再丟給options.hyperLink */
		options.hyperLink = this.hyperLink;
		
		/* Click Event */
		button.bind('click', function() {
			var newtext = $('#' + this.oldTypeId).val();
			newtext = newtext || newtext == null ? newtext : 'nothing';
		    
			// 既非Ajax也非跳轉, 即「純前端事件」的按鈕
			if(options.isNormalButton) {
				// 為了避免不必要的紅色彈跳視窗, 目前先拔掉Ajax功能, 直接在使用的時候bind就好.
//				if (options.role == 'GUEST') {
//					swal({
//						title: "請登入",
//						text: "登入才能新增評論",
//						type: "warning",
//						confirmButtonClass: "btn-danger",
//						confirmButtonText: "確認",
//						closeOnConfirm: true
//					});
//					
//				} else {
//					$.ajax({
//							url : this.destination,
//							type : this.ajaxType,
//							data : $('#' + this.ajaxFormId).serialize()
//					}).done(function(data, textStatus, jqXHR) {
//						if (data.messagesEmpty) {
//							successMessage("success");
//						} else {
//							alertMessage(data.messages);
//						}
//						console.log('success');
//					}).fail(function() {
//						console.log('error');
//					}).always(function() {
//						console.log('complete');
//					});
//				}			
				// 按鈕加上超連結 預設就是"#" (因為原本的功能都是Ajax, 所以現在加上傳統方式)
				if(this.hyperLink != "#" || this.hyperLink != null) {
					window.location.href = options.hyperLink;
				}
			}
		});
	var htmlStr = button.html();
	return button.text(htmlStr);
	}
}

//3. 註冊
abstractButtonFactory.regist('default_button', BUTTON); // 預設


/**
 * 一般化的標籤Builder
 * (PURE JS)
 * @author Thomas Chen
 * @type {{get, regist}}
 */
//1. Builder
var t_builder = (function () {
    var types = {};
    return {
        // getter
        get: function (type, options) {
            var insured_tag = types[type];
            return (insured_tag ? new insured_tag(options) : null);
        },
        // setter
        regist: function (type, insured_tag) {
            var proto = insured_tag.prototype;
            types[type] = insured_tag;
            return t_builder;
        }
    };
})();

/**
 * 一般化的標籤型別
 * (PURE JS)
 * @author Thomas Chen
 * @param options
 */
//2. Object (div)
function insured_tag(options) {
    this.tag = options.tag || "DIV";
    this.type = options.type || "";
    this.fores = options.fores || "";
    this.id = options.id || "" ;
    this.name = options.name || "";
    this.classes = options.classes || "";
    this.style = options.style || "";
    this.width = options.width || "";

    this.readonly = options.readonly || "";
    // fancybox
    this.iframe = options.iframe || "";
    this.href = options.href || "";
    // zip_code
    this["data-role"] = options["data-role"] || "";
    this["data-name"] = options["data-name"] || "";
    this["data-value"] = options["data-value"] || "";
    // toggle_btn
	this["data-color"] = options["data-color"] || "";
	this["data-on"] = options["data-on"] || "";
	this["data-off"] = options["data-off"] || "";
	this["data-toggle"] = options["data-toggle"] || "";
	this["data-target"] = options["data-target"] || "";
	// textarea
    this.rows = options.rows || "";
	// col(row)span
    this.colspan = options.colspan || "";
    this.rowspan = options.rowspan || "";

    this.value = options.value || "";
    this.selected = options.selected || false;
    this.checked = options.checked || "";
    this.disabled = options.disabled || false;
    this.text = options.text || "";
    this.children = options.children || new Array();

    this.setTag = function(tag) {
        this.tag = tag;
        return this;
    };
    this.setType = function(type) {
        this.type = type;
        return type;
    };
    this.setFores = function(fores) {
        this.fores = fores;
        return this;
    };
    this.setId = function(id) {
        this.id = id;
        return this;
    };
    this.setName = function(name) {
        this.name = name;
        return this;
    };
    this.setClasses = function(classes) {
        this.classes = classes;
        return this;
    };
    this.setStyle = function(style) {
        this.style = style;
        return this;
    };
    this.setWidth = function(width) {
    	this.width = width;
    	return this;
	};
    this.setReadonly = function(readonly) {
    	this.readonly = readonly;
    	return this;
	};
    this.setRows = function(rows) {
        this.rows = rows;
        return this;
    };
    this.setColspan = function(colspan) {
    	this.colspan = colspan;
    	return this;
	};
    this.setRowspan = function(rowspan) {
    	this.rowspan = rowspan;
    	return this;
	};
    this.setIframe = function(iframe) {
        this.iframe = iframe;
        return this;
    };
    this.setHref = function(href) {
        this.href = href;
        return this;
    };
    this.setValue = function(value) {
        this.value = value;
        return this;
    };
    this.setText = function(text) {
        this.text = text;
        return this;
    };
    this.setSelected = function(selected) {
        this.selected = selected;
        return this;
    };
    this.setChecked = function(checked) {
    	this.checked = checked;
    	return this;
	};
    this.setDisabled = function(disabled) {
        this.disabled = disabled;
        return this;
    };
    this.setChildren = function (children) {
        this.children = children;
        return this;
    };


    this.build = function() {
        var tag = document.createElement(this.tag);
        tag.setAttribute("type", this.type);
        tag.setAttribute("for", this.fores);
        tag.setAttribute("id", this.id);
        tag.setAttribute("name", this.name);
        tag.className = this.classes;
        tag.setAttribute("style", this.style);
        if(this.readonly) {
        	tag.setAttribute("readonly", this.readonly);
		}
        if(this.width) {
        	tag.setAttribute("width", this.width);
		}
        tag.setAttribute("value", this.value);
        if(this.rows) {
            tag.setAttribute("rows", this.rows);
        }
        if(this.selected) {
            tag.setAttribute("selected", this.selected);
        }
        if(this.checked) {
        	tag.setAttribute("checked", this.selected);
		}
        if(this.disabled) {
            tag.setAttribute("disabled", this.disabled);
        }
        if(this.colspan) {
            tag.setAttribute("colspan", this.colspan);
        }
        if(this.rowspan) {
            tag.setAttribute("rowspan", this.rowspan);
        }
        if(this.iframe) {
            tag.setAttribute("data-fancybox-type", this.iframe);
        }
        if(this.href) {
            tag.setAttribute("href", this.href);
        }
        if(this["data-role"]) {
            tag.setAttribute("data-role", this["data-role"]);
        }
        if(this["data-name"]) {
            tag.setAttribute("data-name", this["data-name"]);
        }
        if(this["data-value"]) {
            tag.setAttribute("data-value", this["data-value"]);
        }
        if(this["data-color"]) {
            tag.setAttribute("data-color", this["data-color"]);
        }
        if(this["data-on"]) {
            tag.setAttribute("data-on", this["data-on"]);
        }
        if(this["data-off"]) {
            tag.setAttribute("data-off", this["data-off"]);
        }
        if(this["data-toggle"]) {
            tag.setAttribute("data-toggle", this["data-toggle"]);
        }
        if(this["data-target"]) {
            tag.setAttribute("data-target", this["data-target"]);
        }
        tag.innerHTML = this.text;
        for(var i = 0; i < this.children.length; i++) {
            tag.appendChild(this.children[i]);
        }
        return tag;
    }
}



//3. 註冊
t_builder.regist('insuredTag', insured_tag);   // <LABEL>







/**
 * @Author Thomas.Chen
 * 目前init帶出的東西都是先寫死的, 未來這些資料都將從DB取得.
 * TODO: ths與tbs都可以是外部傳入的陣列.
 *
 */
function init_planTable(insertTag, tableId, ths, tbs) {
	// 判斷目前table的body有多少個rows
	var exist_rows_q = $('.checkbox_in_table').size();
	
	/** 填入要素  */
// 	var options = {'tHCs': ths, 'tBCs': tbs};
	var table_test = tableBuilder.get('planTable', {})
					.setTHCs(ths)
					.setTBCs(tbs)
					.setTableId(tableId)
					.build();

	/** 插入指定標籤位置 */
	$('#'+insertTag).append(table_test);
	
};

function init_planTable(insertTag, tableId, ths, tbs, thead_color) {
	// 判斷目前table的body有多少個rows
	var exist_rows_q = $('.checkbox_in_table').size();
	
	/** 填入要素  */
// 	var options = {'tHCs': ths, 'tBCs': tbs};
	var table_test = tableBuilder.get('planTable', {})
	.setTHCs(ths)
	.setTBCs(tbs)
	.setTableId(tableId)
	.setHead_color(thead_color)
	.build();
	
	/** 插入指定標籤位置 */
	$('#'+insertTag).append(table_test);
	
};





/**
 * 
 * @Author Thomas.Chen
 * 舊的按下「新增保險項目」的生成方式不好(因為會重新洗掉以輸入的內容). 目前改成按下按鈕, 其他DOM物件不變, 只插入一條row到目前的table中.
 *	1. 製作row
 *	2. 找到table的tbody
 *	3. 將待新增的空row. append到tbody
 * TODO: 這邊的程式碼與planTable物件裡面初始化的動作有些重複, 將來要思考如何抽出.
 */
 /**
  * 參數1為指定欲更新的tableID, 參數2為 tbs
  */
function update_planTable(tableId, tbs) {
	 
	 // 為了每次table異動都要清除「勾選所有」. 一致在這邊取消勾選. 因為「刪除」後該dom就不再存在table中, 故只需要考量「新增」的狀況.
	 $("table [type='checkbox']").prop('checked', false);
// 	 $("tr:first-child [type='checkbox']").prop('checked', false);
	
	// TODO : 必須更精準地指定thead, tbody 裡面第一個column的checkbox才要執行 
	/* 
	$("td:first-child").each(function() {
		$(this).get(0).setAttribute('checked', false);
		$(this).get(0).removeAttribute('checked');
		$(this).get(0).checked = false;

		
		if($(this).get(0) instanceof jQuery) {
			console.log("true")
		}
	})

	
	for(var i = 0; i < $("td:first-child").length; i++) {
		console.log($("td:first-child")[i])
		
	}
	*/


	// 計算現有序號
//	var exist_rows_q = $('.checkbox_in_table').size();
	 // 該table內, 排除thead, 單指tbody內部的checkbox有多少個, 用來計數用的.
	 var exist_rows_q = $("#" + tableId + " > tbody [class='checkbox_in_table']").size();
	 // console.log(exist_rows_q)
	 
	// 需要創一個二維陣列, 每一row都是array, 共有n 個rows.
// 	var tbs = addition_tbs; 
	/** tbs.rows 是二維陣列 */

	
	
	/* 判斷一共有幾個rows*/
	var table_body_contents = {};
	table_body_contents.rows =[];
	// 逐一包裝 外部傳進來的二維陣列tbs (加上<tr>) 
	for(var i =0; i < tbs.rows.length; i++) {
		 table_body_contents.rows.push($('<tr></tr>').append(tbs.rows[i]));
	}	
	
	
	// 塞表身內容
	for(var j = 0; j < table_body_contents.rows.length; j++) {
		// 逐一將 rows 內的array抽出, 再逐row插入到tbody中
		$('#' + tableId).find('tbody').each(function() {
			$(this).append(table_body_contents.rows[j]);
		})
	}
	
};

