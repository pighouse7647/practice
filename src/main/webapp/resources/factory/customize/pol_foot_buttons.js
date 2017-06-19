/***
 * 新契約作業每一個Tab最下方的Button(流程)
 * @Author Thomas.chen
 * @param options
 * @returns
 */
	// 基本資料
	function get_detail_foot_buttons(options) {
    console.log(options.copyVersion_btn_url);

		// 複製版本
		if (options.contractStatus == "ACTIVE" && options.isFinal == "false" && options.opStatus != "CMP") {
			$('#insure_basic_info').append(
					 abstractButtonFactory
					.get('default_button', {})
					.setBtnTxt(" 複製版本")
					.setBtnClass("btn btn-success")
					.setIsNormalButton(true)
					.build()
					.bind("click", function() {
						swal({
							  title: '確定複製版本?\n未儲存資料會遺失!',
							  text: "確定複製此版本",
							  type: 'warning',
							  showCancelButton: true,
							  cancelButtonText: '取消',
							  confirmButtonColor: '#3085d6',
							  cancelButtonColor: '#d33',
							  confirmButtonText: '確定'
							}, function (isConfirm) {
					            if (isConfirm) {
                                    $.ajax({
                                        url: options.copyVersion_btn_url,
                                        method: 'POST',
                                        contentType: 'application/json; charset=utf-8',
                                        data: JSON.stringify(toObject('#' + options.formId)),
                                        beforeSend: function () {
                                            loadingBtn();
                                        },
                                    }).done(function(data, textStatus, jqXHR) {
                                        if(data.messagesEmpty) {
                                            swal({
                                                type: 'success',
                                                text: '儲存成功',
                                                timer: 2000,
                                                showConfirmButton: false,
                                                allowOutsideClick: false,
                                            }, function(){
                                                window.parent.$.fancybox.close();
                                                // window.parent.location.reload();
                                                window.parent.location.href = options.edit_url+"/" + data.data.id;
                                                // options.edit_url+"/" + data.data.id
                                            });
                                        } else {
                                            alertMessage(data.messages, {});
                                            resetBtn();
                                        }
                                    }).fail(function(jqXHR, textStatus, errorThrown) {
                                        alertAjaxFail(jqXHR, textStatus, errorThrown);
                                        resetBtn();
                                    }).always(function() {
                                        deblock();
                                        resetBtn();
                                    });
					                return true;
					            } else {
					                return false;
					            }
							})
					}));
					
		}
		
		
		// 結案(報價完成)
		if (options.opStatus == "CMP" && options.isFinal == "false") {
			$('#insure_basic_info').append(
					 abstractButtonFactory
					.get('default_button', {})
					.setBtnTxt(" 結案")
					.setBtnClass("btn btn-primary")
					.setIsNormalButton(true)
					.build()
					.bind('click', function() {		
						swal({
							title: "確認結案",
							text: "是否要結案此版本報價",
							type: "warning",
							showCancelButton: true,
							confirmButtonClass: "btn-danger",
							confirmButtonText: "確認",
							cancelButtonText: "取消"
 						},
 						function(isConfirm){
 						  if (isConfirm) {
								$.put(options.confirmVersion_btn_url, options.formId, function(data) {
									if(data.messagesEmpty) {
										successMessage("結案成功");
										location.href = options.edit_url+"/" + data.data.id;
									} else {
										// $log.debug(data);
										alertMessage(data.messages, {})
									}
								});
						
							} else { }
						})
					}));
		}
		
		// 送審按鈕
//		if (options.contractStatus == "ACTIVE" && options.isFinal == "false" && options.opStatus != "CMP") {
//			$('#insure_basic_info').append(
//					 abstractButtonFactory
//					.get('default_button', {})
//					.setBtnTxt(" 送審")
//					.setBtnClass("btn btn-primary")
//					.setIsNormalButton(true)
//					.build()
//					.bind('click', function() {			
//						$.get(options.send_btn_url, options.formId, function(data) {
//							if(data.messagesEmpty) {
//								successMessage("送審成功");
//								location.href = options.edit_url+"/" + data.data.id;
//							} else {
//								// $log.debug(data);
//								alertMessage(data.messages, {})
//							}
//						});
//					}));
//			
//		}
		
		// 新增儲存
		if(!options.id) {
			$('#insure_basic_info').append(
					abstractButtonFactory
					.get('default_button', {})
					.setBtnTxt(" 儲存")
					.setBtnClass("btn btn-info")
					.build()
					.bind('click', function() {
					    enblock();
						$.post(options.insert_btn_url, options.formId, function(data) {
							if(data.messagesEmpty) {
								successMessage("新增成功");
								location.href = options.edit_url+"/" + data.data.id;
							} else {
								// $log.debug(data);
								alertMessage(data.messages, {});
                                deblock();
							}
						});
					}));
		} else if ((options.contractStatus == "ACTIVE" && options.isFinal == "false" && options.opStatus != "CMP")) {
		// 編輯儲存	
			$('#insure_basic_info').append(
					abstractButtonFactory
					.get('default_button', {})
					.setBtnTxt(" 儲存")
					.setBtnClass("btn btn-info")
					.build()
					.bind('click', function() {
                        enblock();
                        $.put(options.update_btn_url, options.formId, function(data) {
							if(data.messagesEmpty) {
								successMessage("儲存成功");
								location.href = options.edit_url+"/" + data.data.id;
							} else {
								// $log.debug(data);
								alertMessage(data.messages, {});
                                deblock();
                            }
						});
					}));
		}
		
		// 關閉按鈕
		// $('#insure_basic_info').append(
		// 		 abstractButtonFactory
		// 		.get('default_button', {})
		// 		.setBtnTxt(" 關閉")
		// 		.setBtnClass("btn btn-warning")
		// 		.setIsNormalButton(true)
		// 		.build()
		// 		.bind("click", function() {
		// 			swal({
		// 				  title: '確定關閉\n未儲存資料會遺失?',
		// 				  text: "確定關閉此畫面",
		// 				  type: 'warning',
		// 				  showCancelButton: true,
		// 				  cancelButtonText: '取消',
		// 				  confirmButtonColor: '#3085d6',
		// 				  cancelButtonColor: '#d33',
		// 				  confirmButtonText: '確定'
		// 				}, function (isConfirm) {
		// 		            if (isConfirm) {
		// 		            	location.href = options.close_btn_url;
		// 		                return true;
		// 		            } else {
		// 		                return false;
		// 		            }
		// 				})
		// 			}));
	};

	
	// 共用按鈕(儲存, 關閉)
	function get_common_foot_buttons(options) {
		
		// 關閉按鈕
		// $('#' + options.buttonId).append(
		// 		abstractButtonFactory
		// 		.get('default_button', {})
		// 		.setBtnTxt(" 關閉")
		// 		.setBtnClass("btn btn-warning pull-right")
		// 		.setIsNormalButton(true)
		// 		.build()
		// 		.bind("click", function() {
		// 			swal({
		// 			  title: '確定關閉?',
		// 			  text: "確定關閉此畫面",
		// 			  type: 'warning',
		// 			  showCancelButton: true,
		// 			  cancelButtonText: '取消',
		// 			  confirmButtonColor: '#3085d6',
		// 			  cancelButtonColor: '#d33',
		// 			  confirmButtonText: '確定'
		// 			}, function (isConfirm) {
		// 	            if (isConfirm) {
		// 	            	location.href = options.close_btn_url;
		// 	                return true;
		// 	            } else {
		// 	                return false;
		// 	            }
		// 			})
		// 		}));
		
		// 儲存按鈕
		$('#' + options.buttonId).append(
				abstractButtonFactory
				.get('default_button', {})
				.setBtnTxt(" 儲存")
				.setBtnClass("btn btn-info pull-right")
				.setBtnId("saveBtn")
				.setIsNormalButton(true)
				.build());
	};
	
	// 共用按鈕For fancybox使用(儲存, 關閉)
	function get_common_fancybox_foot_buttons(options) {
		
		// 關閉按鈕
		$('#' + options.buttonId).append(
				abstractButtonFactory
				.get('default_button', {})
				.setBtnTxt(" 關閉")
				.setBtnClass("btn btn-warning pull-right")
				.setIsNormalButton(true)
				.build()
				.bind("click", function() {
					swal({
					  title: '確定關閉?',
					  text: "確定關閉此畫面",
					  type: 'warning',
					  showCancelButton: true,
					  cancelButtonText: '取消',
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: '確定'
					}, function (isConfirm) {
			            if (isConfirm) {
			            	window.parent.$.fancybox.close();
			                return true;
			            } else {
			                return false;
			            }
					})
				}));
		
		// 儲存按鈕
		$('#' + options.buttonId).append(
				abstractButtonFactory
				.get('default_button', {})
				.setBtnTxt(" 儲存")
				.setBtnClass("btn btn-info pull-right")
				.setBtnId("saveBtn")
				.setIsNormalButton(true)
				.build());
	};
	
	// 共用按鈕(儲存, 關閉)
	function get_common_foot_buttons_quotation(options) {
		
		// 關閉按鈕
		$('#' + options.buttonId).append(
				abstractButtonFactory
				.get('default_button', {})
				.setBtnTxt(" 關閉")
				.setBtnClass("btn btn-warning pull-right")
				.setIsNormalButton(true)
				.build()
				.bind("click", function() {
					swal({
					  title: '確定關閉?',
					  text: "確定關閉此畫面",
					  type: 'warning',
					  showCancelButton: true,
					  cancelButtonText: '取消',
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: '確定'
					}, function (isConfirm) {
			            if (isConfirm) {
			            	location.href = options.close_btn_url;
			                return true;
			            } else {
			                return false;
			            }
					})
				}));
		
		// 儲存按鈕
		$('#' + options.buttonId).append(
				abstractButtonFactory
				.get('default_button', {})
				.setBtnTxt(" 儲存")
				.setBtnClass("btn btn-info pull-right")
				.setBtnId("saveBtn")
				.setIsNormalButton(true)
				.build());
		
		// 產生簽核單
		$('#' + options.buttonId).append(
				abstractButtonFactory
				.get('default_button', {})
				.setBtnTxt(" 產生簽核單")
				.setBtnClass("btn btn-danger pull-right")
				.setBtnId("approveBtn")
				.setIsNormalButton(true)
				.build());
		
		// 產生建議書
		$('#' + options.buttonId).append(
				abstractButtonFactory
				.get('default_button', {})
				.setBtnTxt(" 產生建議書")
				.setBtnClass("btn btn-success pull-right")
				.setBtnId("suggestBtn")
				.setIsNormalButton(true)
				.build());
	};

// loading...字樣
function loadingBtn() {
    $('button').each(function() {
        $(this).button('loading');
    });
    $('#wait').show();
};

// 重設loading...字樣
function resetBtn() {
    $('button').each(function() {
        $(this).button('reset');
    });
    $('#wait').hide();
};

