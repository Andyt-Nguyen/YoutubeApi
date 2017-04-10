YoutubeApp
.service('MovieService',['$http', function($http){
	console.log('You REACHED the service');
	console.log(this.token, 'yoyoyo');
	this.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png";
	var baseurl = "https://www.googleapis.com/youtube/v3/search";
	this.watchUrl = "https://www.youtube.com/watch?v=";


	this.getMovieData = function(searchResults){
		var promise =
		$http({
			method: "GET",
			url: baseurl,
			params: {
				key: "AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ",
				part: "snippet, id",
				chart: 'mostPopular',
				myRating:'like',
				maxResults: 15,
				q: searchResults,
				type: 'video',
				videoType: 'movie',
				videoDuration: 'long',
				safeSearch: 'moderate',
				pageToken: this.token
			}
		});
		console.log('Hello Movie promise youtubeData Token!', this.token);

		this.moveTokenPage = function (token){
			console.log('Function MOVETOKEN PROMISE',token);
			this.token = token;
			//this.getYoutubeData(searchResults);
		};


		return promise.then(function(response){
			console.log('Service promise', response);
			return response.data;

		});
	}
}]);
