YoutubeApp.controller('YTMovieController', ['$scope','YoutubeService', function($scope, YoutubeService){

	console.log('Inside the controller.');
	$scope.youtubeLogo = YoutubeService.youtubeLogo;
	$scope.watchUrl = YoutubeService.watchUrl;
	$scope.showToken = true;

	$scope.getMovieData = function(searchResults){
		console.log('Reached inside the function getYoutubeApi in controller');
		var promise = YoutubeService.getMovieData(searchResults);
		promise.then(function(response){
			$scope.youtube = response.items;
			console.log('This is the response from controller', response);
			console.log('This is youtube scope in controller ', $scope.youtube);
			$scope.showToken = false;
			$scope.searchResults = "";


			//Changing bewteen pages
			$scope.searchBarYoutube = searchResults;
			$scope.nextToken = response.nextPageToken;
			$scope.prevToken = response.prevPageToken;

			console.log('This is the next token', $scope.nextToken, ' inside the controller');

			$scope.moveTokenPage = function(token){
				YoutubeService.moveTokenPage(token);
				$scope.getYoutubeApi(searchResults);
			}
		});
	}

	$scope.getYoutubeViews = YoutubeService.getMovieData();
}]);
