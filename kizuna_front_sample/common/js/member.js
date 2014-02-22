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

	/* 要素の全体構成の構築。 */
	$('<table>', { id : 't-member' }).appendTo($("section[class='sec']"));
	$('<caption>', { id : 't-caption' }).appendTo($('#t-member'));
	$('<thead>', { id : 't-thead' }).appendTo($('#t-member'));
	$('<tbody>', { id : 't-tbody' }).appendTo($('#t-member'));

	/* 各要素にデータを設定。 */
	$('#t-thead').append('<tr><th>ユーザ画像</th><th>ユーザ名</th><th>メールアドレス</th><th>プロフィール</th></tr>');

	/* ユーザ情報を設定。 */
	for ( i = 0; i < 50; i++) {

		var resCount = i + 1;
		var userKey = 0000 + i;
		var recordClass = 'user-record' + i;


		$('<tr>', { class : recordClass }).appendTo($('#t-member'));

		$('tr[class=' + recordClass + ']').append(
				'<td>' + resCount + '番目</td>'
				+ '<td>' + resCount + '番目 ユーザ名</td>'
				+ '<td>' + resCount + '番目 メールアドレス</td>'
				+ '<td></td>');

		/* プロフィール画面への遷移ボタンの設定。 */
		$('<button>', {
				class : 'toProfile'
				, value : userKey
				, text : 'プロフィール'
		}).appendTo($('tr[class=' + recordClass + '] > td:last-of-type'));

	};

		$('#t-caption').append('<p>ユーザ情報一覧</p>ユーザ数：' + resCount + '件');

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



/* ----- プロフィール画面へ繊維 ----- */
function toProfileMove() {

	$("button").click( function() {
		var moveTo = "profile.html";
		var userKey = $(this).attr("value");
		var param = "userKey=" + userKey;

		alert(moveTo + "?" + param);

		location.assign(moveTo + "?" + param);

	});
}
		