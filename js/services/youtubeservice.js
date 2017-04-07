YoutubeApp
.service('YoutubeService',['$http', function($http){
	var baseurl = "https://www.googleapis.com/youtube/v3/search";
	this.watchUrl = "https://www.youtube.com/watch?v=";

	this.getYoutubeData = function(){
		console.log('The server has been connected');
		var promise =
		$http({
			method: "GET",
			url: baseurl,
			params: {
				key: "AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ",
				part: "snippet, id",
				maxResults: 14,
				q:	'dogs',
				type: 'video',
				//pageToken: this.token
			}
			return promise.then(function(response){
				console.log(response.data);
				return response.data;
			});
		})
	}
}]);
