'use strict';

var YoutubeApp = angular.module('YoutubeApp', []);
'use strict';

$(document).on('click', function (e) {
		e.preventDefault();
		console.log(this);
		$('.youtube').YouTubeModal({ autoplay: 0, width: 640, height: 480 });
});
'use strict';

YoutubeApp.controller('YoutubeController', ['$scope', 'YoutubeService', function ($scope, YoutubeService) {

	console.log('Inside the controller.');
	$scope.youtubeLogo = YoutubeService.youtubeLogo;
	$scope.watchUrl = YoutubeService.watchUrl;

	$scope.getYoutubeApi = function (searchResults) {
		console.log('Reached inside the function getYoutubeApi in controller');
		var promise = YoutubeService.getYoutubeData(searchResults);
		promise.then(function (response) {
			$scope.youtube = response.items;
			console.log('This is the response', response);
			console.log('This is youtube scope ', $scope.youtube);

			//Changing bewteen pages
			$scope.searchBarYoutube = searchResults;
			$scope.nextToken = response.nextPageToken;
			$scope.prevToken = response.prevPageToken;

			console.log('This is the next token', $scope.nextToken, ' inside the controller');

			$scope.moveTokenPage = function (token) {
				YoutubeService.moveTokenPage(token);
				$scope.getYoutubeApi(searchResults);
			};
		});
	};
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
"use strict";

YoutubeApp.directive('changingPages', function () {
	return {
		restrict: "E",
		controller: "YoutubeController",
		templateUrl: 'views/pagetoken.html'
	};
});
'use strict';

YoutubeApp.directive('searchBar', function () {
	return {
		controller: 'YoutubeController',
		templateUrl: 'views/searchbar.html'
	};
});
'use strict';

YoutubeApp.service('YoutubeService', ['$http', function ($http) {
	console.log('You REACHED the service');
	//this.token = undefined;
	console.log(this.token, 'yoyoyo');
	this.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png";
	var baseurl = "https://www.googleapis.com/youtube/v3/search";
	this.watchUrl = "https://www.youtube.com/watch?v=";

	this.getYoutubeData = function (searchResults) {
		var promise = $http({
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

		this.moveTokenPage = function (token) {
			console.log('Function MOVETOKEN PROMISE', token);
			this.token = token;
			//this.getYoutubeData(searchResults);
		};

		return promise.then(function (response) {
			console.log('Service promise', response.data);
			return response.data;
		});
	};

	// this.moveTokenPage = function(searchResults,token){
	// 	console.log('Thisi5555 si s',token);
	// 	this.getYoutubeData(searchResults,token);
	// 	setTimeout(function(){
	// 		this.getYoutubeData();
	// 	}, 2000);
	// };
}]);
//# sourceMappingURL=bundle.js.map
