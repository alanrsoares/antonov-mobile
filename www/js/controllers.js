angular.module('antonov.controllers', [])

    .controller('AppCtrl', function ($scope, $location, appCache, auth) {

        (function checkLoginStatus() {

            var loginPath = "/app/login";

            var shouldRedirect = $location.path() !== loginPath && !auth.isAuthenticated();

            if (shouldRedirect)
                $location.path(loginPath);
        })();

        $scope.openView = function (viewPath) {
            var basePath = "index.html";
            var webView = new steroids.views.WebView(basePath + viewPath);
            steroids.layers.push(webView);
        };
    })

    .controller('LoginCtrl', function ($scope, $location, auth) {
        $scope.authenticate = function () {
            auth.authenticate($scope.username, $scope.password);
            if (auth.isAuthenticated())
                $location.path("/");
        }
    })

    .controller('MetricsCtrl', function ($scope, metricManager, tileBuilder) {

        steroids.view.navigationBar.show("TOP CHARTS");

        $scope.onRefresh = function () {
            console.log("Refreshing...");
            $scope.$broadcast('scroll.refreshComplete');
        };

        var tiles = metricManager.tiles;

        $scope.rows = tileBuilder.buildRows(tiles, 2);
    })

    .controller('MetricCtrl', function ($scope, $stateParams, metricManager) {

        var metricId = $stateParams.metricId;

        console.log("metricId: " + metricId);

        $scope.metric = metricManager.tile(metricId);
    });