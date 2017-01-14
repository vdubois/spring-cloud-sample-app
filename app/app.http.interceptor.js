(function () {
    'use strict';

    angular.module('cloudSampleApp')
        .factory('appHttpInterceptor', function (localStorageService, $location) {
            var redirectIfJwtTokenNotFound = function () {
                var jwtToken = localStorageService.get('cloudSample-app-jwt-token');
                if (!jwtToken) {
                    $location.url('/login');
                }
            };
            return {
                request: function (config) {
                    redirectIfJwtTokenNotFound();
                    return config;
                },

                requestError: function (config) {
                    return config;
                },

                response: function (res) {
                    // TODO
                    return res;
                },

                responseError: function (res) {
                    return res;
                }
            }
        });
})();
