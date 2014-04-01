angular.module('antonov', [
    'ionic',
    'antonov.controllers',
    'antonov.directives',
    'antonov.filters',
    'antonov.services'
])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.metrics', {
                url: "/metrics",
                views: {
                    'menuContent': {
                        templateUrl: "templates/metrics.html",
                        controller: 'MetricsCtrl'
                    }
                }
            })

            .state('app.metric', {
                url: "/metrics/:metricId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/metric.html",
                        controller: 'MetricCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/metrics');
    });
