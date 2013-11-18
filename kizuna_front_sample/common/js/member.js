/* ----- 初動 ----- */
$(function() {
	init();
	trZoom();
	toProfileMove();
});


/* ----- メンバーリスト表示 ----- */
function init() {

	var baseUrl = 'http://api.ki2na.madfaction.net:80/';

	var memberList;
	var resCount;
	var userKey;						//【テスト用】

		memberList =  '<thead><tr><th>ユーザ画像</th><th>ユーザ名</th><th>メールアドレス</th><th>プロフィール</th></tr></thead><tbody>';
		for ( i = 0; i < 50; i++) {
			resCount = i + 1;
			userKey　= 00000 + i;			//【テスト用】

			memberList += '<tr><td>';
			memberList += resCount + '番目';
			memberList += '</td><td>';
			memberList += resCount + '番目 ユーザ名';
			memberList += '</td><td>';
			memberList += resCount + '番目 メールアドレス';
			memberList += '</td><td>';
			memberList += '<button class="toProfile" value="' + userKey + '">プロフィール</button>';
			memberList += '</td></tr>';

		};

		memberList += '</tbody>';

		$('#t-member').append('<caption><p>ユーザ情報一覧</p>'
													+'ユーザ数：' + resCount + '件</caption>');
		$('#t-member').append(memberList);

		var delaySpeed = 50;
		var fadeSpeed = 1000;
		$('tr').each( function(j) {
			$(this).delay(
			  j * ( delaySpeed )).css({
		       display : 'block'
		     , opacity : '0'
			  } ).animate({
		      opacity : '1'
			  }
				 , fadeSpeed
				);
		} );
}


/* ----- カレント行の強調 ----- */
function trZoom() {

	$("tbody tr").mouseover( function() {
		$(this).addClass("tr-zoom");
	}).mouseout( function() {
		$(this).removeClass("tr-zoom");
	});
}



/* ----- プロフィール画面へ遷移 ----- */
function toProfileMove() {

	$("button").click( function() {
		var moveTo = "profile.html";
		var userKey = $(this).attr("value");
		var param = "userKey=" + userKey;

		alert(moveTo + "?" + param);

		location.assign(moveTo + "?" + param);

	});
}
		