/***
 * 新契約作業每一個Tab最上方的共有的Tabs(基本資料、計劃別設定、簽單名冊、名冊上傳、再保分配)
 * @Author Thomas.chen
 * @param options
 * @returns
 */

function initial_tabs(options) {
		$('#tab1').append(
				  abstractButtonFactory
					.get('default_button', {})
					.setBtnTxt(" 基本資料")
					.setBtnClass("btn btn-link")
					.setHyperLink("#")
					.setIsNormalButton(true)
					.build()
					.bind('click', function() {
		  				var oldForm = $('#' + options.formId).serializeArray();
		  				var hasDiff = false;
		  				
		  				for(var i = 0; i < INITIALFORM.length; i++) {
		  					if(INITIALFORM[i].name == oldForm[i].name) {
		  						if(INITIALFORM[i].value != oldForm[i].value) {
			  						hasDiff |= true;
		  						}
		  						
		  					} else {
			  					hasDiff |= true;
		  					}
		  				}
		  				if(hasDiff) {
		  					alert("請先儲存.");
		  				} else {
		  					window.location.href = options.tab1_url;
		  				}
		  			}));
		
		$('#tab2').append(
				abstractButtonFactory
				.get('default_button', {})
				.setBtnTxt(" 計劃別設定")
				.setBtnClass("btn btn-link")
				.setHyperLink("#")
				.setIsNormalButton(true)
				.build()
				.bind('click', function() {
					var oldForm = $('#' + options.formId).serializeArray();
					var hasDiff = false;
					for(var i = 0; i < INITIALFORM.length; i++) {
						if(INITIALFORM[i].name == oldForm[i].name) {
							if(INITIALFORM[i].value != oldForm[i].value) {
								hasDiff |= true;
							}
							
						} else {
// 				  				$log.debug((INITIALFORM[i].name || 'na') + "\t" + (oldForm[i].name || 'na'))
							hasDiff |= true;
						}
					}
					// 新增時id為空, 故url以/ 結尾 
					if(hasDiff || options.tab2_url.endsWith("/")) {
						alert("請先儲存.");
					} else {
						window.location.href = options.tab2_url;
					}
				}));
		
		
		
		
		
		  $('#tab3').append(
				  abstractButtonFactory
					.get('default_button', {})
					.setBtnTxt(" 簽單名冊")
					.setBtnClass("btn btn-link")
					.setHyperLink("#")
					.setIsNormalButton(true)
					.build()
					.bind('click', function() {
		  				var oldForm = $('#' + options.formId).serializeArray();
		  				var hasDiff = false;
		  				
		  				for(var i = 0; i < INITIALFORM.length; i++) {
		  					if(INITIALFORM[i].name == oldForm[i].name) {
		  						if(INITIALFORM[i].value != oldForm[i].value) {
			  						hasDiff |= true;
		  						}
		  					} else {
			  						hasDiff |= true;
		  					} 
		  				}
		  				
		  				if(hasDiff) {
		  					alert("請先儲存.");
		  				} else {
		  					window.location.href = options.tab3_url;
		  				}
		  			}));
		  $('#tab4').append(
				  abstractButtonFactory
					.get('default_button', {})
					.setBtnTxt(" 名冊上傳")
					.setBtnClass("btn btn-link")
					.setHyperLink("#")
					.setIsNormalButton(true)
					.build()
					.bind('click', function() {
		  				var oldForm = $('#' + options.formId).serializeArray();
		  				var hasDiff = false;
		  				
		  				for(var i = 0; i < INITIALFORM.length; i++) {
		  					if(INITIALFORM[i].name == oldForm[i].name) {
		  						if(INITIALFORM[i].value != oldForm[i].value) {
			  						hasDiff |= true;
		  						}
		  					} else {
			  						hasDiff |= true;
		  					} 
		  				}
		  				
		  				if(hasDiff) {
		  					alert("請先儲存.");
		  				} else {
		  					window.location.href = options.tab4_url;
		  				}
		  			}));
		  $('#tab5').append(
				  abstractButtonFactory
					.get('default_button', {})
					.setBtnTxt(" 再保分配")
					.setBtnClass("btn btn-link")
					.setHyperLink("#")
					.setIsNormalButton(true)
					.build()
					.bind('click', function() {
		  				var oldForm = $('#' + options.formId).serializeArray();
		  				var hasDiff = false;
		  				
		  				for(var i = 0; i < INITIALFORM.length; i++) {
		  					if(INITIALFORM[i].name == oldForm[i].name) {
		  						if(INITIALFORM[i].value != oldForm[i].value) {
			  						hasDiff |= true;
		  						}
		  					} else {
			  						hasDiff |= true;
		  					} 
		  				}
		  				
		  				if(hasDiff) {
		  					alert("請先儲存.");
		  				} else {
		  					window.location.href = options.tab5_url;
		  				}
		  			}));
	}
