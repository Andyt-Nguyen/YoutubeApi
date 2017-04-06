angular.module('YoutubeApp')
.controller('YoutubeController', ['$scope','$http', function($scope, $http){
	
	$scope.watchUrl = "https://www.youtube.com/watch?v=";

	$scope.getYoutubeData = function(searchResults){
		$http({
			method: 'GET',
			url: 'https://www.googleapis.com/youtube/v3/search',
			params: {
				key: 'AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ',
				part: 'snippet, id',
				maxResults: 12,
				q: searchResults,
				type: 'video'
			}
		}).then(function(response){
			console.log(response.data.items);
			 $scope.youtube = response.data.items;
		});
	}
}]);
