function getTalk(theme_id,j) {
	/*var theme_id = $("#a").val();*/
	var talk_user_key
	var talk_seq_num
	var start_seq_num 
	var data_count
	var valueArray = new Array();
	
	$.ajax( {
		dataType : 'jsonp'
		, data     : {
			theme_id : theme_id,
			talk_user_key : talk_user_key,
			talk_seq_num : talk_seq_num,
			start_seq_num : start_seq_num,
			data_count : data_count
		}
		, url      : baseUrl + 'talk/get-talk'
		, cache    : false
		, async    : true
		, type     : 'get'
		, success  : function( data ) {
			
			valueArray = data;
			//alert(valueArray["talk_data"].length);
			loadTalk(valueArray,j);
		}
	} );
}

function loadTalk(data,j) {
			$("#messages").empty();	
			for(var i = data["talk_data"].length; i>data["talk_data"].length-10*j; i--){
				var talk = data.talk_data[i-1].talk;
				var talk_user_name = data.talk_data[i-1].talk_user_name;
				var talk_date = data.talk_data[i-1].talk_date;
				var theme_id = data.talk_data[i-1].theme_id;
				var talk_seq_num = data.talk_data[i-1].talk_seq_num;
				var kizunauHtml = "";
				
				kizunauHtml += "<div class=\"notedesign\">";
				kizunauHtml += "<div class=\"notetitle\">" + talk_user_name + "<font color=\"black\"> → </font>" + theme_id + "   " + talk_date + "</div>";
				kizunauHtml += "<p>";
				kizunauHtml += talk;
				kizunauHtml += "</p>";

				for (var x = 0; x<data.talk_data[i-1]["comment_data"].length; x++){
					kizunauHtml += "<div class=\"commentarea_design\">";
					kizunauHtml += "<p>";
					kizunauHtml += data.talk_data[i-1].comment_data[x].comment;
					kizunauHtml += "</p>";
					kizunauHtml += "</div>";
				}
				kizunauHtml += "<textarea name=\"comment\" id=\"comment_" + talk_seq_num +"\" cols=\"40\" rows=\"1\"></textarea>";
				kizunauHtml += "<button type=\"button\" class=\"comment_button\" id=\"comment_button_" + talk_seq_num + "\" >コメントする</button>";
				kizunauHtml += "</div>";
				$("#messages").append(kizunauHtml);
			}
}