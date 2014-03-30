angular.module('antonov.directives', [])

.directive('tile', function() {
	return {
		templateUrl: 'tile.html',
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) {
		    scope.flipView = function(id) {
                var isOdd = parseInt(id) % 2 !== 0;
				var viewPath = "index.html#/app/metrics/" + id;
				var view = new steroids.views.WebView(viewPath);
				var flipAnimation = new steroids.Animation({
					transition: (isOdd ? "flipHorizontalFromRight" : "flipHorizontalFromLeft"),
					reversedTransition: (isOdd ? "flipHorizontalFromLeft" : "flipHorizontalFromRight")
				});
				steroids.layers.push({
					view: view,
					animation: flipAnimation
				});
			};
		}		
	};
});