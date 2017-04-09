YoutubeApp
.service('YoutubeService',['$http', function($http){
	console.log('You REACHED the service');


	this.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png";
	var ytbaseurl = "https://www.googleapis.com/youtube/v3/";
	this.watchUrl = "https://www.youtube.com/watch?v=";


	this.getYoutubeSearch = function(searchResults){
		var promise =
		$http({
			method: "GET",
			url: ytbaseurl + 'search',
			params: {
				key: "AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ",
				part: "snippet, id",
				chart: 'mostPopular',
				myRating:'like',
				maxResults: 15,
				q: searchResults,
				type: 'video',
				safeSearch: 'moderate',
				pageToken: this.token
			}
		});

		console.log('Hello promise youtubeData Token!', this.token);
		this.moveTokenPage = function (token){
			console.log('Function MOVE TOKEN PROMISE',token);
			this.token = token;
			//this.getYoutubeData(searchResults);
		};


		return promise.then(function(response){
			console.log('Service Promise Response: ', response);
			return response.data;

		});
	}

	this.getYoutubeViews = function(){
		var promise =
		$http({
			method: "GET",
			url: ytbaseurl + 'videos',
			params: {
				key: 'AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ',
				part: 'statistics, snippet',
				chart: 'mostPopular',
			}
		});
		return promise.then(function(response){
			console.log('This is the Views Service Response Data: ', response.data);
			return response.data;
		})
	}

}]);



// this.moveTokenPage = function(searchResults,token){
// 	console.log('Thisi5555 si s',token);
// 	this.getYoutubeData(searchResults,token);
// 	setTimeout(function(){
// 		this.getYoutubeData();
// 	}, 2000);
// };
