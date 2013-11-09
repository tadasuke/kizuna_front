$(function() {
	BaseUrl = {
		getBaseUrl: function() {
			/* テスト時はURLを変えて実行すればそれぞれのAPIを叩ける。 （運用方法がきまるまでの暫定対応）*/
			var baseUrl = "http://suzuki.api.ki2na.madfaction.net/";
			return baseUrl;
		}
	}
});

