'use strict';

var YoutubeApp = angular.module('YoutubeApp', []);
'use strict';

$(document).on('click', function (e) {
		e.preventDefault();
		console.log(this);
		$('.youtube').YouTubeModal({ autoplay: 0, width: 640, height: 480 });
});
'use strict';

angular.module('YoutubeApp').controller('YoutubeController', ['$scope', '$http', function ($scope, $http) {

	$scope.watchUrl = "https://www.youtube.com/watch?v=";

	$scope.getYoutubeData = function (searchResults) {
		$http({
			method: 'GET',
			url: 'https://www.googleapis.com/youtube/v3/search',
			params: {
				key: 'AIzaSyDlPmknZS4zRY9KPWfm8f3v6OYSfB3UivQ',
				part: 'snippet, id',
				maxResults: 12,
				q: searchResults,
				type: 'video'
			}
		}).then(function (response) {
			console.log(response.data.items);
			$scope.youtube = response.data.items;
		});
	};
}]);
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
