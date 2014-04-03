angular.module('antonov.controllers', [])

    .controller('AppCtrl', function ($scope, $location) {

        var loginPath = "/app/login";

        if ($location.path() !== loginPath) {
            $location.path(loginPath);
        }

        $scope.openView = function (viewPath) {
            var basePath = "index.html";
            var webView = new steroids.views.WebView(basePath + viewPath);
            steroids.layers.push(webView);
        };
    })

    .controller('LoginCtrl', function ($scope) {
        $scope.email = "";
        $scope.password = "";
    })

    .controller('MetricsCtrl', function ($scope, metricManager, tileBuilder) {

        steroids.view.navigationBar.show("TOP CHARTS");

        $scope.onRefresh = function () {
            console.log("Refreshing... Ahhh!");
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