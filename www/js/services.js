angular.module('antonov.services', [])

    .factory('metricManager', function () {

        var tiles = [
            {
                id: 1,
                position: 1,
                header: "Revenue",
                body: "$143,450",
                style: "mint"
            },
            {
                id: 2,
                position: 2,
                header: "Sales",
                body: "3,423",
                style: "grass"
            },
            {
                id: 3,
                position: 3,
                header: "Avg. Ticket",
                body: "$132.45",
                style: "sunflower"
            },
            {
                id: 4,
                position: 4,
                header: "Payments",
                body: "28%",
                footer: "MasterCard",
                style: "bittersweet"
            },
            {
                id: 5,
                position: 5,
                header: "Order Status",
                body: "8%",
                footer: "Approved",
                style: "grapefruit"
            },
            {
                id: 6,
                position: 6,
                header: "TRO",
                body: "28%",
                style: "grass"
            }
        ];

        var tile = function (tileId) {
            return _.find(tiles, {
                'id': parseInt(tileId)
            });
        };

        return {
            tiles: tiles,
            tile: tile
        };
    })

    .factory('tileBuilder', function () {

        var buildRows = function (tilesData, maxColumns) {

            maxColumns = maxColumns || 2;

            var tilesLength = tilesData.length;

            var rowsLength = Math.ceil(tilesLength / maxColumns);

            var rows = [];

            for (var i = 0; i < rowsLength; i++) {
                var row = [];
                for (var k = 0; k < maxColumns; k++) {
                    if (tilesData.length > 0)
                        row.push(tilesData.shift());
                }
                rows.push(row);
            };

            return rows;
        }

        return {
            buildRows: buildRows
        };
    })

    .factory('licenseManager', function(){
        var serviceBaseAddress = "https://licensemanager.vtex.com.br/api/site";
    })

    .factory('auth', function ($http, $localStorage) {

        var serviceBaseAddress = "https://vtexid.vtex.com.br/api/vtexid/pub/authentication/";

        function getAuthenticationToken(callback) {
            $http
                .get(serviceBaseAddress + 'start')
                .then(function (response) {
                    callback(response.data.authenticationToken);
                });
        };

        function validateLogin(token, user, callback) {
            $http
                .get(serviceBaseAddress + 'classic/validate',
                {
                    params: {
                        authenticationToken: token,
                        login: user.email,
                        password: user.password
                    }
                })
                .then(function (response) {
                    callback(response.data);
                });
        }

        function getAuthenticatedUser() {
            return $localStorage.currentUser;
        };

        function isAuthenticated() {
            var current = getAuthenticatedUser();
            return typeof current !== 'undefined' && current !== null;
        };

        function login(user, callback) {
            getAuthenticationToken(function (token) {
                validateLogin(token, user, function (res) {
                    if (res.authStatus === "Success") {
                        $localStorage.currentUser = _.extend(user, res);
                        callback();
                    }
                });
            });
        };

        function logout() {
            $localStorage.currentUser = null;
        };

        return {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            getAuthenticationToken: getAuthenticationToken,
            getAuthenticatedUser: getAuthenticatedUser
        };
    });
