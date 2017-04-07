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
	$scope.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png";
	$scope.getYoutubeApi = function () {
		var promise = YoutubeService.getYoutubeData();
		promise.then(function (response) {
			console.log(response.data);
		});
	};
}]);

// //Just In Case Things Goes Bad
// YoutubeApp
// .controller('YoutubeController', ['$scope','$http', function($scope, $http){
// 	//Background image
// 	$scope.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png"
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
// YoutubeApp
// .service('YoutubeService',['$http', function($http){
// 	var baseurl = "https://www.googleapis.com/youtube/v3/search";
// 	this.watchUrl = "https://www.youtube.com/watch?v=";
//
// 	this.getYoutubeData = function(){
// 		console.log('The server has been connected');
// 		var promise =
// 		$http({
// 			method: "GET",
// 			url: baseurl,
// 			params: {
// 				key: "AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ",
// 				part: "snippet, id",
// 				maxResults: 14,
// 				q:	'dogs',
// 				type: 'video',
// 				pageToken: this.token
// 			}
// 			return promise.then(function(response){
// 				console.log(response.data);
// 				return response.data;
// 			});
// 		})
// 	}
// }]);
"use strict";
//# sourceMappingURL=bundle.js.map
