angular.module('antonov', [
    'ionic',
    'antonov.controllers',
    'antonov.directives',
    'antonov.filters',
    'antonov.services'
])

    .run(function ($ionicPlatform, $rootScope, $location) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!$rootScope.loggedUser) {
                alert(next.templateUrl);
                // no logged user, we should be going to #login
                if (next.templateUrl === "templates/login.html") {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    $location.path("/app/login");
                }
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

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: 'LoginCtrl'
                    }
                }
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
