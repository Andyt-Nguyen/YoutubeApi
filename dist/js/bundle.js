'use strict';

var YoutubeApp = angular.module('YoutubeApp', []);
'use strict';

$(document).on('click', function (e) {
		e.preventDefault();
		console.log(this);
		$('.youtube').YouTubeModal({ autoplay: 0, width: 640, height: 480 });
});
'use strict';

YoutubeApp.controller('YoutubeController', ['$scope', '$http', function ($scope, $http) {
	//Background image
	$scope.youtubeLogo = "https://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png";
	//======================

	//Youtube API
	$scope.watchUrl = "https://www.youtube.com/watch?v=";
	$scope.nextToken = "";
	// $scope.prevToken = "CAwQAQ";
	$scope.getYoutubeData = function (searchResults) {
		$http({
			method: 'GET',
			url: 'https://www.googleapis.com/youtube/v3/search',
			params: {
				key: 'AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ',
				part: 'snippet, id',
				maxResults: 12,
				q: searchResults,
				type: 'video',
				pageToken: $scope.nextToken
			}
		}).then(function (response) {
			console.log(response.data);
			$scope.youtube = response.data.items;
			$scope.searchResults = "";
		});
	};
	//======================
}]);
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

angular.module('YoutubeApp').service('YoutubeService', ['$http', function ($http) {

	var baseurl = "https://www.googleapis.com/youtube/v3/search";

	this.getYoutube = function () {
		var promise = $http({
			method: "GET",
			url: baseurl
		});
	};
}]);
//# sourceMappingURL=bundle.js.map
