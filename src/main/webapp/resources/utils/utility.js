
function isEmpty(value) {
    var regform = / /g;
    var flag = false;
    if (value.replace(regform, "").length == 0) {
        flag = true;
    }
    return flag;
}

function isNumerical(value) {
	var bValid = true;
	var regform = / /g;
	value = value.replace(regform, "");

	if (value.length > 0) {
		if (isNaN(value)) {
			bValid = false;
	   }
		if (bValid) {
			var numbers = "0123456789-.";
			for (var i=0; i<value.length; i++) {
				if (numbers.indexOf(value.charAt(i)) == -1) {
					bValid = false;
					break;
				}
			}
		}
	}
	return bValid;
}

function isAllNumber(value) {
	var bValid = true;
	if (!isEmpty(value)) {
		var keywords = "0123456789";
		for (var i=0; i<value.length; i++) {
			if (keywords.indexOf(value.charAt(i)) == -1) {
				bValid = false;
				break;
			}
		}
	} else {
		bValid = false;
	}
	return bValid;
}

function isAllEnglish(value) {
	var bValid = true;
	if (!isEmpty(value)) {
		value = value.toLowerCase();
		var keywords = "abcdefghijklmnopqrstuvwxyz";
		for (var i=0; i<value.length; i++) {
			if (keywords.indexOf(value.charAt(i)) == -1) {
				bValid = false;
				break;
			}
		}
	} else {
		bValid = false;
	}
	return bValid;
}

/**
 * 限制使用者只能輸入數字0-9 可輸入 . - 
 */
function InputOnlyNum(event) {
	if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) 
		event.returnValue=false;
}

/**
 * 限制使用者只能輸入數字0-9 + ,(44) + ~(126) 不可輸入 . -
 */
function InputOnlyNum2(event) {
	if (event.keyCode!=44 && event.keyCode!=126  && (event.keyCode<48 || event.keyCode>57)) 
		event.returnValue=false;
} 

/**
 * 限制使用者只能輸入數字0~9 不可輸入 . - (20140618修改增加delete及backspace)
 * 								(20140708修改增加數字鍵盤0-9)
 */
function InputOnlyNum3(event) {
	if (!((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=96 && event.keyCode<=105)) && event.keyCode != 8 && event.keyCode != 46) 
		event.returnValue=false;
}

/**
 * 限制使用者只能輸入0-9,A-Z,a-z
 */
function InputOnlyEngAndNum(event) {  
	if ( !((event.keyCode>=48 && event.keyCode<=57)  || (event.keyCode>=65 && event.keyCode<=90) ||  (event.keyCode>=97 && event.keyCode<=122) ) ) 
		event.returnValue=false;
} 

/**
 * 檢查身分證字號或統編是否正常
 */
function checkID(id){
	letter ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
	i=0;
	result=0;

	id=id.toUpperCase(); // 轉成大寫
	id=id.replace(" /g", ""); // 把空白換掉
	if(id.length != 10) // 是不是10個字?
	{
//		if ( id.length == 8 )	return chknumCompanyNo(id);
//		alert("身分證長度不正確。");
		return false;
	}
	if(letter.indexOf(id.substring(0,1)) == -1)
	{
//		alert("身分證第一個字母必須是英文:o。");
		return false;
	} 
	else {
		i = letter.indexOf(id.substring(0,1)) + 10;
	}
	
	result=0;

	if(isNaN(id.substring(1,10)))
	{
//		alert("身分證後面九碼必須是數字。");
		return false;
	}

	if(id.substring(1,2) != "1" && id.substring(1,2) != "2")
	{
//		alert("身分證性別錯誤。");
		return false;
	}

	idalpha = id.substring(0,1);
	idalpha_value= 0;

	if( idalpha == "A" )  idalpha_value = 1;
	else if( idalpha == "B" )  idalpha_value = 10;
	else if( idalpha == "C" )  idalpha_value = 19;
	else if( idalpha == "D" )  idalpha_value = 28;
	else if( idalpha == "E" )  idalpha_value = 37;
	else if( idalpha == "F" )  idalpha_value = 46;
	else if( idalpha == "G" )  idalpha_value = 55;
	else if( idalpha == "H" )  idalpha_value = 64;
	else if( idalpha == "I" )  idalpha_value = 39;
	else if( idalpha == "J" )  idalpha_value = 73;
	else if( idalpha == "K" )  idalpha_value = 82;
	else if( idalpha == "L" )  idalpha_value = 2;
	else if( idalpha == "M" )  idalpha_value = 11;
	else if( idalpha == "N" )  idalpha_value = 20;
	else if( idalpha == "O" )  idalpha_value = 48;
	else if( idalpha == "P" )  idalpha_value = 29;
	else if( idalpha == "Q" )  idalpha_value = 38;
	else if( idalpha == "R" )  idalpha_value = 47;
	else if( idalpha == "S" )  idalpha_value = 56;
	else if( idalpha == "T" )  idalpha_value = 65;
	else if( idalpha == "U" )  idalpha_value = 74;
	else if( idalpha == "V" )  idalpha_value = 83;
	else if( idalpha == "W" )  idalpha_value = 21;
	else if( idalpha == "X" )  idalpha_value = 3;
	else if( idalpha == "Y" )  idalpha_value = 12;
	else if( idalpha == "Z" )  idalpha_value = 30;


	for(i=1; i<9; i++)
	{
		result += (parseInt(id.substring(i, i+1)) * (9-i));
	}

	result = result+idalpha_value;

	if( ((10 - (result % 10))%10) != id.substring(9,10))
	{
//		alert("身分證錯誤！");
		return false;
	}

	return true;
}

/**
 * 限制使用者只能輸入0-9,A-Z,a-z
 */
function InputOnlyIdno(event) {  
	if ( !((event.keyCode>=48 && event.keyCode<=57)  || (event.keyCode>=65 && event.keyCode<=90) ||  (event.keyCode>=97 && event.keyCode<=122) ) ) 
		event.returnValue=false;
} 

/**
 * 限制使用者只能輸入0-9,A-Z,a-z,*
 * 並自動轉換大小寫
 */
function InputOnlyIdno2(event) {  
	if ( !((event.keyCode>=48 && event.keyCode<=57)  || (event.keyCode>=65 && event.keyCode<=90) ||  (event.keyCode>=97 && event.keyCode<=122) ||  (event.keyCode==42)) ) 
		event.returnValue=false;
	
	if (event.keyCode>=97 && event.keyCode<=122)
		event.keyCode -= 32;
}

/**
 * 檢查身分證字號是否正常
 */
function checkOnlyID(id){
	letter ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
	i=0;
	result=0;

	id=id.toUpperCase(); // 轉成大寫
	id=id.replace(" /g", ""); // 把空白換掉
	if(id.length != 10) // 是不是10個字?
	{
		//alert("身分證長度不正確。");
		return false;
	}
	if(letter.indexOf(id.substring(0,1)) == -1)
	{
		//alert("身分證第一個字母必須是英文:o。");
		return false;
	} 
	else {
		i = letter.indexOf(id.substring(0,1)) + 10;
	}
	
	result=0;

	if(isNaN(id.substring(1,10)))
	{
		//alert("身分證後面九碼必須是數字。");
		return false;
	}

	if(id.substring(1,2) != "1" && id.substring(1,2) != "2")
	{
		//alert("身分證性別錯誤。");
		return false;
	}

	idalpha = id.substring(0,1);
	idalpha_value= 0;

	if( idalpha == "A" )  idalpha_value = 1;
	else if( idalpha == "B" )  idalpha_value = 10;
	else if( idalpha == "C" )  idalpha_value = 19;
	else if( idalpha == "D" )  idalpha_value = 28;
	else if( idalpha == "E" )  idalpha_value = 37;
	else if( idalpha == "F" )  idalpha_value = 46;
	else if( idalpha == "G" )  idalpha_value = 55;
	else if( idalpha == "H" )  idalpha_value = 64;
	else if( idalpha == "I" )  idalpha_value = 39;
	else if( idalpha == "J" )  idalpha_value = 73;
	else if( idalpha == "K" )  idalpha_value = 82;
	else if( idalpha == "L" )  idalpha_value = 2;
	else if( idalpha == "M" )  idalpha_value = 11;
	else if( idalpha == "N" )  idalpha_value = 20;
	else if( idalpha == "O" )  idalpha_value = 48;
	else if( idalpha == "P" )  idalpha_value = 29;
	else if( idalpha == "Q" )  idalpha_value = 38;
	else if( idalpha == "R" )  idalpha_value = 47;
	else if( idalpha == "S" )  idalpha_value = 56;
	else if( idalpha == "T" )  idalpha_value = 65;
	else if( idalpha == "U" )  idalpha_value = 74;
	else if( idalpha == "V" )  idalpha_value = 83;
	else if( idalpha == "W" )  idalpha_value = 21;
	else if( idalpha == "X" )  idalpha_value = 3;
	else if( idalpha == "Y" )  idalpha_value = 12;
	else if( idalpha == "Z" )  idalpha_value = 30;


	for(i=1; i<9; i++)
	{
		result += (parseInt(id.substring(i, i+1)) * (9-i));
	}

	result = result+idalpha_value;

	if( ((10 - (result % 10))%10) != id.substring(9,10))
	{
		//alert("身分證號格式有誤!");
		return false;
	}

	return true;
}

/**
 * 檢查身分證字號(無alert，僅return true or false)
 */
function isID(id){
	letter ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
	i=0;
	result=0;

	id=id.toUpperCase(); // 轉成大寫
	id=id.replace(" /g", ""); // 把空白換掉
	if(id.length != 10) { // 是不是10個字?
		return false;
	} if(letter.indexOf(id.substring(0,1)) == -1) {
		return false;
	} else {
		i = letter.indexOf(id.substring(0,1)) + 10;
	}
	
	result=0;

	if(isNaN(id.substring(1,10))) {
		return false;
	} if(id.substring(1,2) != "1" && id.substring(1,2) != "2") {
		return false;
	}

	idalpha = id.substring(0,1);
	idalpha_value= 0;

	if( idalpha == "A" )  idalpha_value = 1;
	else if( idalpha == "B" )  idalpha_value = 10;
	else if( idalpha == "C" )  idalpha_value = 19;
	else if( idalpha == "D" )  idalpha_value = 28;
	else if( idalpha == "E" )  idalpha_value = 37;
	else if( idalpha == "F" )  idalpha_value = 46;
	else if( idalpha == "G" )  idalpha_value = 55;
	else if( idalpha == "H" )  idalpha_value = 64;
	else if( idalpha == "I" )  idalpha_value = 39;
	else if( idalpha == "J" )  idalpha_value = 73;
	else if( idalpha == "K" )  idalpha_value = 82;
	else if( idalpha == "L" )  idalpha_value = 2;
	else if( idalpha == "M" )  idalpha_value = 11;
	else if( idalpha == "N" )  idalpha_value = 20;
	else if( idalpha == "O" )  idalpha_value = 48;
	else if( idalpha == "P" )  idalpha_value = 29;
	else if( idalpha == "Q" )  idalpha_value = 38;
	else if( idalpha == "R" )  idalpha_value = 47;
	else if( idalpha == "S" )  idalpha_value = 56;
	else if( idalpha == "T" )  idalpha_value = 65;
	else if( idalpha == "U" )  idalpha_value = 74;
	else if( idalpha == "V" )  idalpha_value = 83;
	else if( idalpha == "W" )  idalpha_value = 21;
	else if( idalpha == "X" )  idalpha_value = 3;
	else if( idalpha == "Y" )  idalpha_value = 12;
	else if( idalpha == "Z" )  idalpha_value = 30;


	for (i=1; i<9; i++) {
		result += (parseInt(id.substring(i, i+1)) * (9-i));
	}

	result = result+idalpha_value;

	if ( ((10 - (result % 10))%10) != id.substring(9,10)) {
		return false;
	}

	return true;
}


//檢查居留證號碼
function checkResidencePermit(id) {

	if (id.length != 10) return false;

	if (isNaN(id.substr(2,8)) || (id.substr(0,1)<"A" ||id.substr(0,1)>"Z") || (id.substr(1,1)<"A" ||id.substr(1,1)>"Z")){
		alert("居留證號碼格式錯誤！");
		return false;				
	}
	
	var head="ABCDEFGHJKLMNPQRSTUVXYWZIO";
	id = (head.indexOf(id.substr(0,1))+10) +''+ ((head.indexOf(id.substr(1,1))+10)%10) +''+ id.substr(2,8);
	s =parseInt(id.substr(0,1)) + 
	parseInt(id.substr(1,1)) * 9 + 
	parseInt(id.substr(2,1)) * 8 + 
	parseInt(id.substr(3,1)) * 7 + 			
	parseInt(id.substr(4,1)) * 6 + 
	parseInt(id.substr(5,1)) * 5 + 
	parseInt(id.substr(6,1)) * 4 + 
	parseInt(id.substr(7,1)) * 3 + 
	parseInt(id.substr(8,1)) * 2 + 
	parseInt(id.substr(9,1)) + 
	parseInt(id.substr(10,1));
	
	//判斷是否可整除
	if ((s % 10) != 0) {
		alert("居留證號碼驗證錯誤！");
		return false;
	}
	//居留證號碼正確		
	return true;
}

	var cx = new Array;
	cx[0] = 1;
	cx[1] = 2;
	cx[2] = 1;
	cx[3] = 2;
	cx[4] = 1;
	cx[5] = 2;
	cx[6] = 4;
	cx[7] = 1;


/**
 * 檢查是否為正常之統編
 */
function chknumCompanyNo2(NO){ 
	var SUM = 0;
	if (NO.length == 1) {
		if(NO == '*'){
			return true;
		}
	}

	if (NO.length != 8) {
		alert("統編錯誤，要有 8 個數字");
		return;
	}
	var cnum = NO.split("");
	for (i=0; i<=7; i++) {
		if (NO.charCodeAt() < 48 || NO.charCodeAt() > 57) 
		{
			alert("統編錯誤，要有 8 個 0-9 數字組合");
			return;
		}
		SUM += cc(cnum[i] * cx[i]);
	}

	if (SUM % 10 == 0) return true;
	else if (cnum[6] == 7 && (SUM + 1) % 10 == 0) return true;
	else {
		alert("統 編 ： "+NO+" 錯 誤 !");
		return false;
	}
}

function cc(n){
	if (n > 9) {
		var s = n + "";
		n1 = s.substring(0,1) * 1;
		n2 = s.substring(1,2) * 1;
		n = n1 + n2;
	}
	return n;
}

/**
 * 檢核是否為統編(無alert，僅return true or false)
 */
function isBusinessNo(sid){
	var tbNum = new Array(1,2,1,2,1,2,4,1);
	var temp = 0;
	var total = 0;
	
	if (sid=="") {
		return false;
	} else if (!sid.match(/^\d{8}$/)) {
		return false;
	} else {
		for (var i = 0; i < tbNum.length ;i ++) {
			temp = sid.charAt(i) * tbNum[i];
			total += Math.floor(temp/10)+temp%10;
		}
		if (total%10==0 || (total%10==9 && sid.charAt(6)==7)) {
			return true;
		} else {
			return false;
		}
	}
}


function isDate(year, month, day) {
	// month argument must be in the range 1 - 12
	month = month - 1; // javascript month range : 0- 11
	var tempDate = new Date(year,month,day);
	
	if ( (tempDate.getFullYear()==year) &&	(month == tempDate.getMonth()) &&	(day == tempDate.getDate()) ) 
		return true;
	else
		return false;
}

/**
 * 民國年日期格式
 */
//default ROC-format: YYY-MM-DD
function isROCDate(value) {
	var dayArray = value.split('-');	
	var len = dayArray.length;
	if (len != 3) {
		return false;
	}

	var rocYear = dayArray[0];
	var rocMonth = dayArray[1];
	var rocDay = dayArray[2];
	
	if (!isNumerical(rocYear) || 
		!isNumerical(rocMonth) ||
		!isNumerical(rocDay)) {
		return false;
	}

	var westYear = parseInt(rocYear, 10) + 1911;
	var westMonth = parseInt(rocMonth, 10);
	var westDate = parseInt(rocDay, 10);
	return isDate(westYear, westMonth, westDate);
}

/**
 * 日期格式檢核 (正確性檢核)
 * 將畫面上的年月日轉成日期再轉回字串，若與原字串一致代表該日期是正確的 (正確日期其轉換會是可逆的)
 */
function isLegalDate(year, month, day){
	var dateStr;
	if (!month || !day) {
		if (month == '') {
			dateStr = year + "/1/1";
		}else if (day == '') {
			dateStr = year + '/' + month + '/1';
		}else {
			dateStr = year.replace(/[.-]/g, '/');
		}
	}else{
		dateStr = year + '/' + month + '/' + day;
	}
	dateStr = dateStr.replace(/\/0+/g, '/');

	var accDate = new Date(dateStr);
	var tempDate = accDate.getFullYear() + "/";
	tempDate += (accDate.getMonth() + 1) + "/";
	tempDate += accDate.getDate();
	if (dateStr == tempDate) {
		return true;
	}else{
		return false;
	}
}

/**
 * 民國年日期檢核 (分隔符只支援 / or -)
 */
function checkDateObjROC(str) {
	if(str == ""){
		return true;
	}else{
		str = str.replace(/\//g,"-");
	}
	
	var dateStrAry = str.split("-");
	if(dateStrAry.length == 3){		
		if(! isLegalDate(1911 + parseInt(dateStrAry[0], 10), dateStrAry[1], dateStrAry[2]) ) {
			return false;
		}
	}else{
		return false;
	}
	return true;
}


function isValidDate(year, month, day) {
	
	if(isNaN(day) || isNaN(month) || isNaN(year)){
		return false;
	}

	var regform = / /g;
	if (month < 1 || month > 12) {
			return false;
	}
	if (day < 1 || day > 31) {
		return false;
	}
	if ((month == 4 || month == 6 || month == 9 || month == 11) &&
		(day == 31)) {
		return false;
	}
	if (month == 2) {
		var leap = (year % 4 == 0 &&
				   (year % 100 != 0 || year % 400 == 0));
		if (day>29 || (day == 29 && !leap)) {
			return false;
		}
	}
	return true;
} 

function checkDateObj(str){
	if(str == ""){
		return true;
	}
	if(str.length != 10){
		//alert( name + "格式錯誤" );
		//obj.select();
		return false;
	}
	
	if( str.indexOf("-") != 4){
		//alert( name + "格式錯誤" );
		//obj.select();
		return false;
	}
	if( str.lastIndexOf("-") != 7){
		//alert( name + "格式錯誤" );
		//obj.select();
		return false;
	}

	var dateStrAry = str.split("-");

	if(dateStrAry.length == 3){		
		if(! isValidDate(dateStrAry[0], 
					dateStrAry[1], 
					dateStrAry[2]) )
		{
			//alert( name + "格式錯誤" );
			//obj.select();
			return false;
		}
	}else{
		return false;
	}
	return true;
}

//yyyy-MM-dd hh:MM
function checkDateTimeObj(str){
	
	if(str == ""){
		return true;
	}
	if(str.length != 16){
		return false;
	}
	
	if( str.indexOf("-") != 4){
		return false;
	}
	if( str.lastIndexOf("-") != 7){
		return false;
	}
	if( str.lastIndexOf(":") != 13){
		return false;
	}

	str = str.split(" ")[0];
	var dateStrAry = str.split("-");

	if(dateStrAry.length == 3){		
		if(! isValidDate(dateStrAry[0], 
					dateStrAry[1], 
					dateStrAry[2]) )
		{
			return false;
		}
	}else{
		return false;
	}
	return true;
}

/**驗證電子郵件位置 */
function validateEmail(email) {
	var regform = / /g;
	var errormsg = "";
	var bValid = true;
	var value = email;
	value = value.replace(regform, "");
	if (isEmpty(value))
		return false;
	return checkEmail(value);	
}

function checkEmail(emailStr) {
   var regform = / /g;
   if (emailStr.length == 0) {
	   return false;
   }
   var emailPat=/^(.+)@(.+)$/;
   var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
   var validChars="\[^\\s" + specialChars + "\]";
   var quotedUser="(\"[^\"]*\")";
   var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
   var atom=validChars + '+';
   var word="(" + atom + "|" + quotedUser + ")";
   var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
   var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
   var matchArray=emailStr.match(emailPat);
   if (matchArray == null) {
	   return false;
   }
   var user=matchArray[1];
   var domain=matchArray[2];
   if (user.match(userPat) == null) {
	   return false;
   }
   var IPArray = domain.match(ipDomainPat);
   if (IPArray != null) {
	   for (var i = 1; i <= 4; i++) {
		  if (IPArray[i] > 255) {
			 return false;
		  }
	   }
	   return true;
   }
   var domainArray=domain.match(domainPat);
   if (domainArray == null) {
	   return false;
   }
   var atomPat=new RegExp(atom,"g");
   var domArr=domain.match(atomPat);
   var len=domArr.length;
   if ((domArr[domArr.length-1].length < 2) ||
	   (domArr[domArr.length-1].length > 3)) {
	   return false;
   }
   if (len < 2) {
	   return false;
   }
   return true;
}

/** 清空選項只保留第一個選項 */
$.fn.extend({
	resetOptions : function () {
		$(this).find("option:gt(0)").remove();
	}
});

/** 檢查textarea字串 有無超出長度限制 */
function checkLienLength(obj,maxLength) {	
	var words = new String( obj.value);	
	if(words.length > maxLength) {
		words = words.substring(0, maxLength);
		obj.value = words;
	}
};

/** 數值轉16進位值 **/
function decimalToHexString(number)
{
    if (number < 0)
    {
    	number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
};

/** from azalea **/
function createOption(text, value) {
	return "<option value='" + value + "'>" + text + "</option>";
}

/** 判斷結束日是否大於起始日(不含時分秒) **/
function isSequDate(startDate, endDate) {
	startDate = startDate.substring(0, 10);
	endDate = endDate.substring(0, 10);
	// first date;
	var startYear = new Number(startDate.substr(0,4));
	var startMonth = new Number(startDate.substr(5,7).substr(0,2))-1;
	var startDay = new Number(startDate.substr(8,10));
	var start = new Date(startYear, startMonth, startDay, 0, 0);
	// second date;
	var endYear = new Number(endDate.substr(0,4));
	var endMonth = new Number(endDate.substr(5,7).substr(0,2))-1;
	var endDay = new Number(endDate.substr(8,10));
	var end = new Date(endYear, endMonth, endDay, 0, 0);
	if (end.valueOf() < start.valueOf()){
		return false;
	}
	return true;
}

/**
 * 求日期區間之天數(含起日)
 * 起日:effectiveDate(yyyy-MM-dd)
 * 訖日:expirateDate(yyyy-MM-dd)
 */
function computeDateDiff(effectiveDate, expirateDate){
	
	var effectiveYear = new Number(effectiveDate.substr(0,4));
	var effectiveMonth = new Number(effectiveDate.substr(5,7).substr(0,2))-1;
	var effectiveDay = new Number(effectiveDate.substr(8,10));
	var effective = new Date(effectiveYear, effectiveMonth, effectiveDay, 0, 0);

	var expirateYear = new Number(expirateDate.substr(0,4));
	var expirateMonth = new Number(expirateDate.substr(5,7).substr(0,2))-1;
	var expirateDay = new Number(expirateDate.substr(8,10));
	var expirate = new Date(expirateYear, expirateMonth, expirateDay, 0, 0);
	
	var day = expirate - effective;
	day =Math.ceil(day/1000/60/60/24)+1;
	return day;
}

/** 保單號類型的輸入檢核(英文轉大寫 左右不留空白)  */
function inputIsPolyNo(obj){
	try {//預防沒有jquery可用
		obj.value=$.trim(obj.value.toUpperCase());
	}catch(error){
		//do nothing
	}
}
/**  如果輸入值只有一位則前面補零(月份)  */
function appendZero(obj){
	var num = obj.value;
	if($.trim(num) !=""){
		if(!isNaN(num) && num.length == 1){
			if(parseInt(num,10) < 10 && parseInt(num,10) > 0) {
				obj.value = "0"+num;
			}
		}
	}
}

//jqGrid 用
// 險別欄位format客製
function  typeInStockFormatter(cellvalue, options, rowObject) {
    if (cellvalue == 'TAS')
        return "旅責";
    else
    	return "遊責";
};

// 抽查狀態format A:未檢視 Y:合格 N:不合格
function statusInStockFormatter(cellvalue, options, rowObject) {
	if (cellvalue == 'A') {
		return '未抽查';
	} else if (cellvalue == 'Y') {
		return '合格';
	} else if (cellvalue == 'N') {
		return '不合格';
	} else {
		return cellvalue;
	}
}

//審核狀態
function statusInApprovalFormatter(cellvalue, options, rowObject) {
	if (cellvalue == 'N') {
		return '未核';
	} else if (cellvalue == 'P') {
		return '審核完成';
	} else if (cellvalue == 'D') {
		return '註銷中';
	} else if (cellvalue == 'A') {
		return '專案核可';
	} else if (cellvalue == 'M') {
		return '一般核可';
	} else if (cellvalue == 'R') {
		return '不核可';
	} else {
		return cellvalue;
	}	
}

//保單狀態format 
function statusInProcessFormatter(cellvalue, options, rowObject) {
	if (cellvalue == 'Q') {
		return '報價';
	} else if (cellvalue == 'D') {
		return '註銷';
	} else if (cellvalue == 'P') {
		return '保單';
	}  else {
		return cellvalue;
	}	
}

//系統狀態format 
function statusInSystemFormatter(cellvalue, options, rowObject) {
	if (cellvalue == 'Y') {
		return '有效資料';
	} else if (cellvalue == 'N') {
		return '無效資料';
	} else  {
		return cellvalue;
	}
}

//千分位
function appendComma(cellvalue, options, rowObject) {
	if (!/^((-*\d+)|(0))$/.test(cellvalue)) {
		var newValue = /^((-*\d+)|(0))$/.exec(cellvalue);
		if (newValue != null) {
			if (parseInt(newValue, 10)) {
				cellvalue = newValue;
			} else {
				cellvalue = '0';
			}
		} else {
			cellvalue = '0';
		}
	}
	if (parseInt(cellvalue, 10) == 0) {
		cellvalue = '0';
	} else {
		cellvalue = parseInt(cellvalue, 10).toString();
	}

	cellvalue += '';
	var arr = cellvalue.split('.');
	var re = /(\d{1,3})(?=(\d{3})+$)/g;
	return arr[0].replace(re, '$1,') + (arr.length == 2 ? '.' + arr[1] : '');
}


function istepFormatter(cellvalue, options, rowObject) {
	if (!cellvalue) {
		return cellvalue;
	}
	if (cellvalue == 'DONE') {
		return '<div class="text-error">已結束</div>';
	} else if (cellvalue == 'NONE') {
		return '無';
	} else {
		return cellvalue.replace('S', '');
	}
}

function ruleStatusFormatter(cellvalue, options, rowObject) {
	if (!cellvalue) {
		return cellvalue;
	}
	if (cellvalue == 'W') {
		return '警告';
	} else if (cellvalue == 'B') {
		return '禁止';
	} else if (cellvalue == 'S') {
		return '送審';
	} else {
		return cellvalue;
	}
}

function flowTypeFormatter(cellvalue, options, rowObject) {
	if (!cellvalue) {
		return cellvalue;
	}
	if (cellvalue == 'S') {
		return '逐步通關';
	} else if (cellvalue == 'M') {
		return '最大關卡';
	} else {
		return cellvalue;
	}
}

function bpmStatusFormatter(cellvalue, options, rowObject) {
	if (!cellvalue) {
		return cellvalue;
	}
	if (cellvalue == 'A') {
		return '<div class="text-info">已核可</div>';
	} else if (cellvalue == 'R') {
		return '<div class="text-error">已駁回</div>';
	} else if (cellvalue == 'P') {
		return '待審';
	} else {
		return cellvalue;
	}
}

function tranDateSlanteStr(cellvalue, options, rowObject){
	//console.log(cellvalue);
	if(typeof cellvalue =='undefined'){
		return "";
	}
	if (!cellvalue) {
		return cellvalue;
	}
	//2013-07-03 00:00	
		//return cellvalue.replace(/\-/g,"/");
	return cellvalue.substring(0,10);
}

function expandFormatter(cellvalue, options, rowObject) {
	var expand = JSON.parse(cellvalue);
	var html = '<table class="table table-bordered table-condensed" style="margin-bottom: 0px">';
	html += '<tr>';
	$.each(expand, function(key) {
		html += '<th style="width:100px">' + key + '</th>';
	});
	html += '</tr>';
	html += '<tr>';
	$.each(expand, function() {
		var value = checkDateTimeObj(this) ? $.format.date(this,'yyyy-MM-dd') : this;
		html += '<td>' + value + '</td>';
	});
	html += '</tr>';
	html += '</table>';
	return html;
}

function doCheckEndstNameData(url){
	if($("#endst").val() != '') {
		var iWidth = 250; //視窗的寬度;
		var iHeight = 220; //視窗的高度;
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //視窗的垂直位置;
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //視窗的水平位置;
		window.open(url+"&entity.endst="+$('#endst').val(), '_black', 'top=' + iTop + ',left=' + iLeft
				+ ',width=920,height=300,toolbar=yes,status=yes,resizable=yes,location=1');
	} else {
		showMsg("請先選擇版本");
	}
}

function chageTitle(obj){
	$(obj).attr("title",$(obj).find(":selected").text());
}

//FOR 記憶查詢CHANNEL SELECT 
function setChannelSelectList(type){
	var channelSelectList = '';
	var channelQryType = $('input[name=channelQryType]:checked').val().toLowerCase();
	if(!"cs" == channelQryType) {
		channelSelectList = '';
		$("#channelSelectList").val(channelSelectList);
	} else if("cs" == channelQryType){
		var chSelector = "#chSelectorCS";
		var i = 1;
		while($(chSelector+i).length > 0) {
			channelSelectList = channelSelectList ==''?'':channelSelectList+",";
			channelSelectList += i + ":" +$(chSelector+i).val();
			i++;
		}
		$("#SelectListCS").val(channelSelectList);
	}
}


//數字欄位加入千分位符號，並加入資料驗證
function numberWithCommas(obj) {
//	alert(obj.attr('name') + " " + obj.val() + " " + isNaN($("#"+obj.attr('name')).val().replace(/,?/g, "")));
//	console.log(obj.attr('name'));
//	console.log(obj)
	if(isNaN($("#"+obj.attr('name')).val().replace(/,?/g, ""))){
		$("#"+obj.attr('name')).val("");
		alert("請輸入數字");
	} else {
        var parts = obj.val().toString().split(".");
        parts[0] = parts[0].replace(/,?/g, "");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		$("#"+obj.attr('name')).val(parts.join("."));
	}
}

// 數字欄位加入千分位符號，並加入資料驗證
// 因應user需求, 在dollar的欄位後面加入兩位小數
function dollarWithCommas(obj) {
//	alert(obj.attr('name') + " " + obj.val() + " " + isNaN($("#"+obj.attr('name')).val().replace(/,?/g, "")));
//	console.log(obj.attr('name'));
//	console.log(obj)
	if(isNaN($("#"+obj.attr('name')).val().replace(/,?/g, ""))){
		$("#"+obj.attr('name')).val("");
		alert("請輸入數字");
	} else {
		// 小數兩位四捨五入
		var dollar = Math.round(obj.val().replace(/,?/g, "") * Math.pow(10,2)) / Math.pow(10,2);
		// 小數取兩位
		dollar = dollar.toFixed(2).toString();
		
		// 整數位再補上逗號, 小數位直接接後面	
        var parts = dollar.split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    
		$("#"+obj.attr('name')).val(parts.join("."));
	}
}

// 左補字串
String.prototype.lPad = function (n,c) {
	var a = this.split(''); 
	
	for (var i = 0; i < n - this.length; i++) {
		a.unshift (c);
	}
	
	return a.join('');
};

// 右補字串
String.prototype.rPad = function (n,c) {
	var a = this.split(''); 
	for (var i = 0; i < n - this.length; i++) {
		a.push (c);
	}
	
	return a.join('');
};

// 驗證數字
function validateNumber(value, integer, decimal) {
	var inputValue = value.replace(/,?/g, "").split(".");
//	alert(inputValue[0]);
//	alert(inputValue[1]);
	
	if (value.indexOf(".") > -1) {
		if (!decimal || decimal == 0) {
			return "請輸入整數";;
		}
		
		if (inputValue[1].length > decimal) {
			return "小數最多只能輸入" + decimal + "位";
		}
	}
	
	if (!!integer && inputValue[0].length > integer) {
		return "整數最多只能輸入" + integer + "位";
	}
	
	if (!isNumerical(value)) {
		return "請輸入數值";
	}
}
// 跳出訊息
function validateNumberMessage(value, integer, decimal) {
	var message = validateNumber(value, integer, decimal);
	
	!!message ? alert(message) : null;
}


// 驗證上限值
function validateMaxNumber(value, maxValue) {
	if (value > maxValue) {
		return "輸入值超過上限(上限為" + maxValue + ")";
	}
}
//跳出訊息
function validateMaxNumberMessage(value, maxValue) {
	var message = validateMaxNumber(value, maxValue);
	
	!!message ? alert(message) : null;
}


//格式化日期(yyyy-MM-dd)
function dateFormatDate(date) {
	if (date != null) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		
		// 月
		month = (month < 10 ? "0" : null) + month;
		// 日
		day = (day < 10 ? "0" : null) + day;
		
		return year + "-" + month + "-" + day;
	}
	return null;
}


//格式化日期(yyyy-MM-dd)
function dateFormatDateTime(date) {
	
	if (date != null) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		
		// 月
		month < 10 ? month = "0" + month : null;
		// 日
		day < 10 ? day = "0" + day : null;
		// 時
		hour < 10 ? hour = "0" + hour : null;
		// 分
		minute < 10 ? minute = "0" + minute : null;
		// 秒
		second < 10 ? second = "0" + second : null;

		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	}
	return null;
}

//身份證檢查函式
function checkTaiwanID(userid) { 
//	alert(userid);
    var reg=/^[A-Z]{1}[1-2]{1}[0-9]{8}$/;  //身份證的正規表示式
//    alert(reg.test(userid));
    if(reg.test(userid)) {
        var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  //把A取代成10,把B取代成11...的作法
        var ct = ["10","11","12","13","14","15","16","17","34","18","19","20","21",
                       "22","35","23","24","25","26","27","28","29","32","30","31","33"];
	    var i = s.indexOf(userid.charAt(0));
	    var tempuserid = ct[i] + userid.substr(1, 9); //若此身份證號若是A123456789=>10123456789
	    var num = tempuserid.charAt(0)*1;
	    for(i = 1; i <= 9; i++) {
	       num = num + tempuserid.charAt(i)*(10-i);
	    }
	    num += tempuserid.charAt(10)*1;
//	    alert(num);
	    if((num%10)==0) {
	       return true;
	    } else {
	       return false;
	    }
    } else {
        return false;
    }
}

// 驗證統編
function checkInvoiceNo(taxId) {
    var invalidList = "00000000,11111111";
    if (/^\d{8}$/.test(taxId) == false || invalidList.indexOf(taxId) != -1) {
        return false;
    }

    var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
        sum = 0,
        calculate = function(product) { // 個位數 + 十位數
            var ones = product % 10,
                tens = (product - ones) / 10;
            return ones + tens;
        };
    for (var i = 0; i < validateOperator.length; i++) {
        sum += calculate(taxId[i] * validateOperator[i]);
    }

    return sum % 10 == 0 || (taxId[6] == "7" && (sum + 1) % 10 == 0);
};

// 根據errorMessages跳出alert訊息
function alertErrorMessages(errorMessages) {
// 	alert(errorMessages.length);
	if(errorMessages.length > 0 ) {
		var popMsgs = new Array();
		$.each(errorMessages, function() {
			$("#"+this.id).parent().find('span > div').html(this.message);
			$("#"+this.id).parent().addClass("has-error");
			
			popMsgs.push(this.message+"\n");
		});
		
		if (popMsgs.length > 0) {
			alertMessage(popMsgs);
		}
		
		return popMsgs;
	}
	
	return null;
}


// use for checkBox
// 1.hidden 欄位 -> name
// 2.Lable必須給ID -> name + Lable
// 3.CheckBox -> name + Chk, 
// sample: packageType, packageTypeLable, packageTypeChk
function checkBoxHelper(name) {
//	alert($("input[name^=" + name + "Chk]:checked").map(function() {return this.value;}).get().join(','));
	$("input[name^=" + name + "Chk]").change(function() {
		$("#" + name).val($("input[name^=" + name + "Chk]:checked").map(function() {return this.value;}).get().join(','));
	});
	
	
	// select / deselect all
	$("#" + name + "Label").dblclick(function() {
//		alert(!!$("#" + name).val());
		if (!!$("#" + name).val()) {
			$("input[name^=" + name + "Chk]").each(function () {
				this.checked = false;
			});
		} else {
			$("input[name^=" + name + "Chk]").each(function () {
				this.checked = true;
			});
		}
		$("input[name^=" + name + "Chk]").trigger("change");
//		alert($("#" + name).val());
	});
}

// 日期格式驗證
function setDatePickerFormat($obj) {
	var name = $obj.name;
	var value = $obj.value;
	
//	alert(name);
//	alert(value);
	
	var year = "";
	var month = "";
	var day = "";
	var length = null;
	
	if (!!value && value.length == 8) {
		year = value.substr(0, 4);
		month = value.substr(4, 2);
		day = value.substr(6, 2);
		var datePickerFormat =  year + "-" + month + "-" + day;
//		alert(datePickerFormat);
		length = value.length;
		$("#" + name).val(datePickerFormat);
	} else if (!!value && value.length == 10) {
		var date = value.split("-");
		year = date[0];
		month = date[1];
		day = date[2];
		length = value.replace(/-/g, '').length;
	} else {
		alertMessage("輸入長度錯誤");
	}
	
	var passFlag = false;
	
//	alert(length);
	if (length == 8) {
//		alert(year);
//		alert(month);
//		alert(day);
		try {
			if (year.length != 4) {
				passFlag = false;
			} else if (month.length != 2 || month > 12) {
				passFlag = false;
			} else if (day.length != 2 || day > 31) {
				passFlag = false;
			} else {
				passFlag = true;
			}
		} catch (err) {
			passFlag = false;
		}
	}
	
	if (!passFlag) {
		alertMessage("輸入格式錯誤");
		$("#" + name).val("");
	}
}




/**
 * @Author Thomas.Chen
 * Abstract Validator Factory
 */
// 1. Builder
var abstractValidatorFactory = (function () {
	// ex: 不為空, 不能有小數點... 
	var rules = {};
	
	return {
		// getter
		build: function (rule, options) {
			var validator = rules[rule];
			return (validator ? new validator(options) : null);
		},
			
		// setter -- 目前沒有檢查吃進來的obj is kind of Button
		register: function (rule, validator) {
			var proto = validator.prototype;
			rules[rule] = validator; 
			return abstractValidatorFactory;
		}
		
	};
})();

// 2. Object
function hasDecimalValidator(options) {
	this.domId = options.domId || '#';
	this.regex = options.regex || new RegExp(/[^0-9]/g);
	this.selectedId = options.selectedId || null;
	this.errorMsg = options.errorMsg || '';
	
	this.isNT = function() {
		var selectedDom = $('select#' + options.selectedId);
		var selectvalue = selectedDom.val();
		return 'NT' == selectvalue;
	}
	
	this.isJY = function() {
		var selectedDom = $('select#' + options.selectedId);
		var selectvalue = selectedDom.val();
		return 'JY' == selectvalue;
	}
	
	this.validate = function() {
		return options.regex.test($('#' + options.domId).val());
	}
	
	this.build = function() {
		return this;
	}
	
	
}

/**
 * 製作錯誤訊息陣列
 * @param validators
 * @returns {Array}
 */
function validateCtrlDataEdit(validators) {
	var errorMsgs = new Array();
	$.each(validators, function(index, value) {
		/* 有條件的驗證 */
		if ((value.isNT() || value.isJY()) && value.validate()) {
			errorMsgs.push({
				id : value.domId,
				message : value.errorMsg
			});
		}
	})
	return errorMsgs;
};

/**
 * 製作錯誤訊息陣列【drop-down】
 */
function validateCtrlDataEdit_drop(errormsgs) {
	var popMsgs = new Array();
	jQuery.each(errormsgs, function(index, value) {
		$("#" + value.id).parent().find('span > div').html(value.message);
		$("#" + value.id).parent().parent().addClass("has-error");
		popMsgs.push(value.message + "\n");
	});
	return popMsgs;
};

// 上傳檔案
function fileUpLoad(id, file, url) {
	console.log("fileupload");
	
	var formData = new FormData();
	formData.append('file', file);	
	formData.append('id',id);
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
										
	$.ajax({
		url: url + "fileUpload",
		type: 'POST',
		data: formData,
		cache: false,
		processData: false,
		contentType: false,
 		beforeSend: function(xhr) {
 			xhr.setRequestHeader(header, token);
		},success: function(data) {
				if(data.data != null){
					console.log(data);
				}else{
					console.log("上傳成功!");
				}
			}
		});
	return false;
}

// 狀態, 啟用 / 停用
function statusFormatter(status) {
	switch(status) {
		case "Y": 
			return '啟用'; 
			break;
		case "N": 
			return '停用'; 
			break;
	}
}

//只是把文字帶換掉 「啟用」變成「有效」, 「不啟用」改為「失效」.
function statusFormatter(value, rows) {
	console.log(value)
	if(value.trim() == '啟用') {
	console.log(value)
		return '有效';
	} else {
	console.log(value)
		return '失效';
	}
};

function formatDate(date) {
	return date.getFullYear() + '-' + 
	      ('0' + (date.getMonth()+1)).slice(-2) + '-' +
	      ('0' + date.getDate()).slice(-2);
}







