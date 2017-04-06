angular.module('YoutubeApp')
.service('YoutubeService',['$http', function($http){

	var baseurl = "https://www.googleapis.com/youtube/v3/search";

	this.getYoutube = function(){
		var promise =
		$http({
			method: "GET",
			url: baseurl
		})
	}
}]);
