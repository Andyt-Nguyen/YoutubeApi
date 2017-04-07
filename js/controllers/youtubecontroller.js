YoutubeApp
.controller('YoutubeController', ['$scope','$http', function($scope, $http){
	//Background image
	$scope.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png"
	//======================

	//Youtube API
	$scope.watchUrl = "https://www.youtube.com/watch?v=";
	$scope.nextToken = ""
	// $scope.prevToken = "CAwQAQ";
	$scope.getYoutubeData = function(searchResults){
		$http({
			method: 'GET',
			url: 'https://www.googleapis.com/youtube/v3/search',
			params: {
				key: 'AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ',
				part: 'snippet, id',
				maxResults: 12,
				q: searchResults,
				type: 'video',
				pageToken: $scope.nextToken
			}
		}).then(function(response){
			console.log(response.data);
			 $scope.youtube = response.data.items;
			 $scope.searchResults = "";
		});
	}
	//======================
}]);
