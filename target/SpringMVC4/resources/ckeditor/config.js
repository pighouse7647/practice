/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	// 【純文字請開啟】指定一開始就使用HTML模式, 就不會產生標籤.
//	config.startupMode = 'source';
	
	// 指定工具列的名稱
	config.toolbar = 'Full';
	
	
	// 因為右邊的「條款說明比較小塊」 所以套用half設定
	// 欲知Half詳情請見config.js
	config.toolbar_Half = [
	['Bold','Italic'],
	['FontSize'],
	]
	
	// 定義工具列
	config.toolbar_Full = [
	['Source', '-', 'Maximize'],
	['Bold','Italic'],
	['FontSize', 'Format'],
	['NumberedList','BulletedList', '-', 'Outdent','Indent']



//	['Source','-','Save','NewPage','Preview','-','Templates'],
//	['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
//	['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
//	['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
//	'/',
//	['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
//	['NumberedList','BulletedList', '-','Outdent','Indent','Blockquote'],
//	['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
//	['Link','Unlink','Anchor'],
//	['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
//	'/',
//	['Styles','Format','Font','FontSize'],
//	['TextColor','BGColor']
	
	];
	
	
	//用分號分隔的標籤名字 在工具欄上顯示 plugins/format/plugin.js
    config.format_tags = 'p;h1';
    
    //字體默認大小 plugins/font/plugin.js
    config.fontSize_defaultLabel = '12px';
    
    //字體編輯時可選的字體大小 plugins/font/plugin.js
    config.fontSize_sizes ='8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px';

    	
    	
    	
    	
    	
    	
    	
	
	
};
