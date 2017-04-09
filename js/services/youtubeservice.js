YoutubeApp
.service('YoutubeService',['$http', function($http){
	console.log('You REACHED the service');
	//this.token = undefined;
	console.log(this.token, 'yoyoyo');
	this.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png";
	var baseurl = "https://www.googleapis.com/youtube/v3/search";
	this.watchUrl = "https://www.youtube.com/watch?v=";


	this.getYoutubeData = function(searchResults){
		var promise =
		$http({
			method: "GET",
			url: baseurl,
			params: {
				key: "AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ",
				part: "snippet, id",
				maxResults: 15,
				q: searchResults,
				type: 'video',
				pageToken: this.token
			}
		});
		console.log('Hello promise youtubeData Token!', this.token);

		this.moveTokenPage = function (token){
			console.log('Function MOVETOKEN PROMISE',token);
			this.token = token;
			//this.getYoutubeData(searchResults);
		};


		return promise.then(function(response){
			console.log('Service promise', response.data);
			return response.data;

		});
	}

	// this.moveTokenPage = function(searchResults,token){
	// 	console.log('Thisi5555 si s',token);
	// 	this.getYoutubeData(searchResults,token);
	// 	setTimeout(function(){
	// 		this.getYoutubeData();
	// 	}, 2000);
	// };
}]);
