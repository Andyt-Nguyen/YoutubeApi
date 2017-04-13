YoutubeApp.service('YoutubeService',['$http', function($http){
	console.log('You REACHED the service');


	this.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png";
	var ytbaseurl = "https://www.googleapis.com/youtube/v3/";
	this.watchUrl = "https://www.youtube.com/watch?v=";


//Youtube Search----------------------------------------->
	this.getYoutubeSearch = function(searchResults){
		var promise =
		$http({
			method: "GET",
			url: ytbaseurl + 'search',
			params: {
				key: "-------API KEy-------",
				order: 'relevance',
				part: "snippet, id",
				chart: 'mostPopular',
				myRating:'like',
				maxResults: 12,
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
			console.log('Service Search Promise Response: ', response);
			return response.data;

		});
	}

	//Youtube Movies-------------------------------------------->
	this.getMovieData = function(searchResults){
		var promise =
		$http({
			method: "GET",
			url: ytbaseurl + 'search',
			params: {
				key: "-----API Key------",
				part: "snippet, id",
				chart: 'mostPopular',
				relevanceLanguage:'en',
				myRating:'like',
				maxResults: 12,
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
		};


		return promise.then(function(response){
			console.log('Service promise', response);
			return response.data;

		});
	}


	//Youtube Trends-------------------------------------------->
	this.getYoutubeTrends = function(){
		var promise =
		$http({
			method: "GET",
			url: ytbaseurl + 'videos',
			params: {
				key: '----------API Key------------',
				part: 'statistics, snippet',
				chart: 'mostPopular',
				maxResults: 15,
			}
		});
		return promise.then(function(response){
			console.log('This is the Trending Service Response Data: ', response.data);
			return response.data;
		})
	};

}]);

















	// this.getYoutubeCategories = function(){
	// 	var promise =
	// 	$http({
	// 		method: "GET",
	// 		url: ytbaseurl + 'videoCategories',
	// 		params: {
	//
	// 		}
	// 	})
	// }


// this.moveTokenPage = function(searchResults,token){
// 	console.log('Thisi5555 si s',token);
// 	this.getYoutubeData(searchResults,token);
// 	setTimeout(function(){
// 		this.getYoutubeData();
// 	}, 2000);
// };
