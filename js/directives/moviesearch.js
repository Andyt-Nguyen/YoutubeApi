YoutubeApp
.directive('movieSearch', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/searchmovie.html',
		controller: 'YTMovieController'
	}
})
