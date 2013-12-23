/*
* !! ログインユーザ情報を常に画面に表示するとなれば、必要（KIZUNA2.0ではそうになっている） !!
* cookieはドメインが違うので取れない。
* 散々調べた結果諦めた。	
* APIを作ってもらいそれで対応する。
*
UserKey取得APIができた場合を想定する。

function getUserKey() {

	$.ajax({
		dataType  : 'jsonp'
		, data    : {

		}
		, url     : baseUrl + 'user/get-user-key'
		, cache   : 'false'
		, async   : 'false'
		, type    : 'get'
		, success : function(data) {
			console.log(data);

		}
	});
}
*/
/**
 * 年月日のセレクトボックスを作成
 */

	
	//------------------------------ funciton ---------------------------------
	
	// セレクトボックスの枠を作成
	function makeBirthdaySelect() {

		$('<select>',
				{
					id: 'year',
					name: 'year'
				}
		).appendTo($("#birthday-area")).after("年");
		$('<select>',
				{
					id: 'month',
					name: 'month'
				}
		).appendTo($("#birthday-area")).after("月");
		$('<select>',
				{
					id: 'day',
					name: 'day'
				}
		).appendTo($("#birthday-area")).after("日");
	}
	// 年セレクトボックス作成
	function makeYearSelect() {

		var options = "";
		for ( var year = 1970; year <= 2000; year++ ) {
			options = "<option value=\"" + year + "\">" + year + "</option>";
			$("#year").append( options );
		}
	}

	// 月セレクトボックス作成
	function makeMonthSelect() {

		var options = "";
		for ( var month = 1; month <= 12; month++ ) {
			options = "<option value='" + ("0" + month).slice(-2) + "'>" + month + "</option>";
			$("#month").append( options );
		}
	}

	// 日セレクトボックス作成
	function makeDaySelect() {

		var options = "";
		for ( var day = 1; day <= 31; day++ ) {
			options = "<option value='" + ("0" + day).slice(-2) + "'>" + day + "</option>";
			$("#day").append( options );
		}

	}

/*
* URLからtarget user key を取得する。
*/
function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

$(document).ready(function(){
	//----------
	// 初期ロード
	//----------
	var vars = getUrlVars();
	var target_user_key = vars['user-key']; 
	getUserData(target_user_key);	
});

/*
 *  yyyymmdd -> [yyyy,mm,dd] 
 */
function splitYMDtoArray(birthday) {
	var year = birthday.substring(0,4);
	var month = birthday.substring(4,6);
	var day = birthday.substring(6,8);
	var arrayBirthday = {year: year, month: month, day: day};
	return arrayBirthday;
}

/**
 * 初期ユーザ情報表示
 */
function setInitUserData(userData) {
	console.log(userData);
	// 本人
	if (userData[0]['identify_person_type'] == "0") {
		$('<input>', {type: 'radio', name: 'gender', class: 'gender', value: '1'}).appendTo($("#gender-area")).after("男");
		$('<input>', {type: 'radio', name: 'gender', class: 'gender', value: '2'}).appendTo($("#gender-area")).after("女");
		$('<input>', {type: 'radio', name: 'gender', class: 'gender', value: '0'}).appendTo($("#gender-area")).after("未公表");
		if (userData[0]['gender']=="1") {
			$(".gender").val(["1"]);
		} else if (userData[0]['gender']=="2") {
			$(".gender").val(["2"]);
		} else {
			$(".gender").val(["0"]);
		}
		// セレクトボックスの枠を作成
		makeBirthdaySelect();
		// 年セレクトボックス作成
		makeYearSelect();
		// 月セレクトボックス作成
		makeMonthSelect();
		// 日セレクトボックス作成
		makeDaySelect();
		var birthday = splitYMDtoArray(userData[0]['birthday']);
		$("#year").val(birthday['year']);
		$("#month").val(birthday['month']);
		$("#day").val(birthday['day']);
		$('<input>', { type: 'text', value: userData[0]['address'], id: 'address'}).appendTo($("#address-area"));
		$('<input>', { type: 'text', value: userData[0]['telephone_number_1'], id: 'telephone_number_1'}).appendTo($("#phone-num1-area"));
		$('<input>', { type: 'text', value: userData[0]['telephone_number_2'], id: 'telephone_number_2'}).appendTo($("#phone-num2-area"));
		$('<tr>', { id: 'update-button-area'}).appendTo($(".f-table")).after($('<td>', {colspan: '2'}).html(
				$('<input>', { type: 'button', value: '登録', id: 'profile-button'}).click(function() {updateUserData();})
		));
	} else {
		// 本人以外
		// gender-area
		switch (userData[0]['gender']) {
		case '1':
			$('<span>', { text: '男'}).appendTo($("#gender-area"));
			break;
		case '2':
			$('<span>', { text: '女'}).appendTo($("#gender-area"));
			break;
		default :
			$('<span>', { text: '未設定'}).appendTo($("#gender-area"));
			break;
		}
		//TODO 日付書式に変換
		var birthday = splitYMDtoArray(userData[0]['birthday']);
		$('<span>', { text: birthday['year'] + '年' + birthday['month'] + '月' + birthday['day'] + '日'}).appendTo($("#birthday-area"));
		$('<span>', { text: userData[0]['address'], id: 'address'}).appendTo($("#address-area"));
		$('<span>', { text: userData[0]['telephone_number_1'], id: 'telephone_number_1'}).appendTo($("#phone-num1-area"));
		$('<span>', { text: userData[0]['telephone_number_2'], id: 'telephone_number_2'}).appendTo($("#phone-num2-area"));

		console.log(userData[0]['telephone_number_1']);
	}
	// 名前は本人／本人以外で共通
	$("#name").text(userData[0]['name']);

}
//$("#get-talk-data-open-user").click(function(){
//});

/*
* ユーザ情報を取得する
*/
function getUserData(target_user_key) {
	
	console.log(target_user_key);
	var userData;
	$.ajax({
		dataType  : 'jsonp'
		, data    : {
			target_user_key  : target_user_key
			, get_param      : 'name,gender,birthday,address,telephone_number_1,telephone_number_2,identify_person_type'
		}
		, url     : BaseUrl.getBaseUrl() + 'user/get-user-data'
		, cache   : 'false'
		, async   : 'false'
		, type    : 'get'
		, success : function(data) {
			console.log(data);
			userData = data['user_data'];	
			console.log(userData);
			setInitUserData(userData);
		}
	});
}

//getUserData();
//function setUserData() {}
$("#send_img_file").click( function() {
	//	$.ajax()	
	}
)

function updateUserData(){

	var gender              = $("#gender").val();
	var birthday            = $("#year").val() + $("#month").val() + $("#day").val();
	var address             = $("#address").val();
	var telephoneNumber1    = $("#telephone_number_1").val();
	var telephoneNumber2    = $("#telephone_number_2").val();
	var profileImgKey	    = $("#profile_img_key").val();
	console.log(birthday);
	console.log(telephoneNumber2);
	$.ajax({
		dataType   : 'jsonp'
		, data     : {
			  gender   : gender
			, birthday : birthday
			, address  : address
			, telephone_number_1 : telephoneNumber1
			, telephone_number_2 : telephoneNumber2
			, profile_img_key	 : profileImgKey
		}
		,url       : BaseUrl.getBaseUrl() + 'user/update-user-data'
		,cache     : 'false'
		,async     : 'false'
		, success  : function(data) {
			if ('0' == data['result']) {
				// 仮メッセージ表示箇所→最後はページ内に表示する？
				alert("更新が成功しました。");
			} else {
				alert("更新に失敗しました。");
			}
		}
	});
}
// トークデータ取得
$(document).ready(function () {
	$("#get-talk-data-disp-user").click(function() {
		var vars = getUrlVars();
		var userKey = vars['user-key'];
		console.log(userKey);
		$.ajax({
			dataType   : 'jsonp'
			, data     : {
				theme_id      : ''
				,talk_user_key : userKey
				,talk_seq_num  : ''
				,start_seq_num : ''
				,data_count    : ''
			}
			,url       : BaseUrl.getBaseUrl() + 'talk/get-talk'
			,cashe     : 'false'
			,async     : 'false'
			,success   : function(data) {
				console.log(data);
				setTalkData(data['talk_data']);
			}
		});
	});
});
// トークデータ出力
function setTalkData(talkArray) {
	var i;
	// トークコンテナ
	$('<article>', { id: 'talk-container'}).appendTo($("#show-talk-area"));
	// １トーク分
	for(i = 0; i < talkArray.length; i++) {
		// トーク表示部分
		$('<section>', { id: 'talk'+ i, class: 'one-talk' }).appendTo($("#talk-container"))
					.html($('<div>', { class: 'talk-user-img'})
					.html($('<img>', { src: '../common/img/get-profile-img.jpg',}).width(80).height(80)));
			$('<div>', { id: 'talk-main-container' + i, class: 'talk-main-container'}).appendTo($("#talk" + i));
			$('<div>', { id: 'talk-header' + i, class: 'talk-header'})
					.html($('<span>', { text: talkArray[i]['talk_user_name']})).appendTo($("#talk-main-container" + i));
				$('<span>', { text: talkArray[i]['theme_id']}).appendTo($("#talk-header" + i));
				$('<span>', { text: talkArray[i]['talk_date']}).appendTo($("#talk-header" + i));
			$('<p>', { id: 'talk-main' + i, class: 'talk-contents', text: talkArray[i]['talk']}).appendTo($("#talk-main-container" + i));

		// コメント表示部分
		$('<div>', { id: 'comment-container' + i, class: 'comment-container'}).appendTo($("#talk-main-container" + i));
		var commentArray = talkArray[i]['comment_data'];
		for (var j = 0; j < commentArray.length; j++) {
			$('<div>', { id: 'comment' + j, class: 'comment'}).appendTo($("#comment-container" + i));
			$('<span>', { text: commentArray[j]['comment_user_name']}).appendTo($("#comment" + j));
			$('<span>', { text: commentArray[j]['comment']}).appendTo($("#comment" + j));
		}
	}
}



