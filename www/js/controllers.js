angular.module('antonov.controllers', [])

    .controller('AppCtrl', function ($scope) {
        $scope.openView = function (viewPath) {
            var basePath = "index.html";
            var webView = new steroids.views.WebView(basePath + viewPath);
            steroids.layers.push(webView);
        };
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