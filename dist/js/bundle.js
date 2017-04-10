'use strict';

var YoutubeApp = angular.module('YoutubeApp', ['ui.router']);
YoutubeApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('searcher', {
		url: '/search',
		templateUrl: 'mini-directives/searchBar.html'
	}).state('movies', {
		url: '/movies',
		templateUrl: 'mini-directives/movieSearch.html'
	});
	$urlRouterProvider.otherwise('searcher');
}]);
'use strict';

$(document).on('click', function (e) {
		e.preventDefault();
		console.log(this);
		$('.youtube').YouTubeModal({ autoplay: 0, width: 640, height: 480 });
});
'use strict';

YoutubeApp.controller('YTMovieController', ['$scope', 'YoutubeService', function ($scope, YoutubeService) {

	console.log('Inside the controller.');
	$scope.youtubeLogo = YoutubeService.youtubeLogo;
	$scope.watchUrl = YoutubeService.watchUrl;
	$scope.showToken = true;

	$scope.getMovieData = function (searchResults) {
		console.log('Reached inside the function getYoutubeApi in controller');
		var promise = YoutubeService.getMovieData(searchResults);
		promise.then(function (response) {
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

			$scope.moveTokenPage = function (token) {
				YoutubeService.moveTokenPage(token);
				$scope.getYoutubeApi(searchResults);
			};
		});
	};

	$scope.getYoutubeViews = YoutubeService.getMovieData();
}]);
'use strict';

YoutubeApp.controller('YoutubeController', ['$scope', 'YoutubeService', function ($scope, YoutubeService) {

	console.log('Inside the controller.');
	$scope.youtubeLogo = YoutubeService.youtubeLogo;
	$scope.watchUrl = YoutubeService.watchUrl;
	$scope.showToken = true;

	$scope.getYoutubeApi = function (searchResults) {
		console.log('Reached inside the function getYoutubeApi in controller');
		var promise = YoutubeService.getYoutubeSearch(searchResults);
		promise.then(function (response) {
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

			$scope.moveTokenPage = function (token) {
				YoutubeService.moveTokenPage(token);
				$scope.getYoutubeApi(searchResults);
			};
		});
	};

	$scope.getYoutubeTrends = YoutubeService.getYoutubeTrends();
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
'use strict';

YoutubeApp.service('YoutubeService', ['$http', function ($http) {
	console.log('You REACHED the service');

	this.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png";
	var ytbaseurl = "https://www.googleapis.com/youtube/v3/";
	this.watchUrl = "https://www.youtube.com/watch?v=";

	//Youtube Search----------------------------------------->
	this.getYoutubeSearch = function (searchResults) {
		var promise = $http({
			method: "GET",
			url: ytbaseurl + 'search',
			params: {
				key: "AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ",
				order: 'relevance',
				part: "snippet, id",
				chart: 'mostPopular',
				myRating: 'like',
				maxResults: 15,
				q: searchResults,
				type: 'video',
				safeSearch: 'moderate',
				pageToken: this.token
			}
		});

		console.log('Hello promise youtubeData Token!', this.token);
		this.moveTokenPage = function (token) {
			console.log('Function MOVE TOKEN PROMISE', token);
			this.token = token;
			//this.getYoutubeData(searchResults);
		};

		return promise.then(function (response) {
			console.log('Service Promise Response: ', response);
			return response.data;
		});
	};

	//Youtube Movies-------------------------------------------->
	this.getMovieData = function (searchResults) {
		var promise = $http({
			method: "GET",
			url: ytbaseurl + 'search',
			params: {
				key: "AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ",
				part: "snippet, id",
				chart: 'mostPopular',
				order: 'relevance',
				relevanceLanguage: 'en',
				myRating: 'like',
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

		this.moveTokenPage = function (token) {
			console.log('Function MOVETOKEN PROMISE', token);
			this.token = token;
			//this.getYoutubeData(searchResults);
		};

		return promise.then(function (response) {
			console.log('Service promise', response);
			return response.data;
		});
	};

	//Youtube Trends-------------------------------------------->
	this.getYoutubeTrends = function () {
		var promise = $http({
			method: "GET",
			url: ytbaseurl + 'videos',
			params: {
				key: 'AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ',
				part: 'statistics, snippet',
				chart: 'mostPopular',
				maxResults: 15
			}
		});
		return promise.then(function (response) {
			console.log('This is the Views Service Response Data: ', response.data);
			return response.data;
		});
	};

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
}]);

// this.moveTokenPage = function(searchResults,token){
// 	console.log('Thisi5555 si s',token);
// 	this.getYoutubeData(searchResults,token);
// 	setTimeout(function(){
// 		this.getYoutubeData();
// 	}, 2000);
// };
'use strict';

YoutubeApp.directive('movieSearch', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/searchmovie.html',
		controller: 'YTMovieController'
	};
});
'use strict';

YoutubeApp.directive('navBar', function () {
	return {
		restrict: 'E',
		templateUrl: "views/navbar.html"
	};
});
"use strict";

YoutubeApp.directive('tokenToken', function () {
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
//# sourceMappingURL=bundle.js.map
