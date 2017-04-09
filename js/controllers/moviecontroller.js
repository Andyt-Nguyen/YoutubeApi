YoutubeApp
.controller('YTMovieController', ['$scope','MovieService', function($scope, MovieService){

	console.log('Inside the controller.');
	$scope.youtubeLogo = MovieService.youtubeLogo;
	$scope.watchUrl = MovieService.watchUrl;
	$scope.showToken = true;

	$scope.getMovieData = function(searchResults){
		console.log('Reached inside the function getYoutubeApi in controller');
		var promise = MovieService.getMovieData(searchResults);
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
				MovieService.moveTokenPage(token);
				$scope.getYoutubeApi(searchResults);
			}
		});
	}

	$scope.getYoutubeViews = MovieService.getMovieData();
}]);



//Just In Case Things Goes Bad

// YoutubeApp
// .controller('YoutubeController', ['$scope','$http', function($scope, $http){
// 	//Background image
	// $scope.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png"
// 	//======================
//
// 	//Youtube API
// 	$scope.watchUrl = "https://www.youtube.com/watch?v=";
// 	// $scope.prevToken = "CAwQAQ";
// 	$scope.getYoutubeData = function(searchResults){
// 		$http({
// 			method: 'GET',
// 			url: 'https://www.googleapis.com/youtube/v3/search',
// 			params: {
// 				key: 'AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ',
// 				part: 'snippet, id',
// 				maxResults: 12,
// 				q: searchResults,
// 				type: 'video',
// 				pageToken: $scope.token
// 			}
// 		}).then(function(response){
// 			console.log(response.data);
// 			console.log(response.data.nextPageToken);
// 			 $scope.youtube = response.data.items;
// 			 $scope.searchBarYoutube = searchResults;
// 			 $scope.searchResults = "";
//
// //Change between pages
// 			 $scope.nextToken = response.data.nextPageToken;
// 			 $scope.prevToken = response.data.prevPageToken;
//
// 			 $scope.moveTokenPage = function(token){
// 				 $scope.token = token;
// 				 $scope.getYoutubeData($scope.searchBarYoutube);
// 			 }
// 		});
// 	}
// }]);
