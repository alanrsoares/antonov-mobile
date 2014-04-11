angular.module('antonov', [
    'ionic',
    'ngStorage',
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

    .config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.landing', {
                url: '/landing',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/landing.html',
                        controller: 'LandingCtrl'
                    }
                }
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('app.metrics', {
                url: '/metrics',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/metrics.html',
                        controller: 'MetricsCtrl'
                    }
                }
            })

            .state('app.metric', {
                url: '/metrics/:metricId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/metric.html',
                        controller: 'MetricCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/metrics');
    });
