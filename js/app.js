var YoutubeApp = angular.module('YoutubeApp',['ui.router']);
YoutubeApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('home', {
		url:'/',
		templateUrl: 'index.html',
	})
	.state('searcher', {
		url:'/search',
		templateUrl: 'mini-directives/searchBar.html'
	})
	.state('movies', {
		url:'/movies',
		templateUrl: 'mini-directives/movieSearch.html'
	})

}]);
