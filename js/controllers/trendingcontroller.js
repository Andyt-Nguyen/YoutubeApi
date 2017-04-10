YoutubeApp.
controller('TrendingController', ['$scope','YoutubeService', function($scope, YoutubeService){
	console.log('hello');
	$scope.getTrendingData = function(){
		var promise = YoutubeService.getYoutubeTrends();
		console.log('Inside getTrendingData');
		promise.then(function(response){
			console.log('Youtube Trending Data: ', response.items);
			$scope.trendingYt = response.items;
		})
	}
	$scope.getTrendingData();
	$scope.getYoutubeTrends = YoutubeService.getYoutubeTrends();

}])
