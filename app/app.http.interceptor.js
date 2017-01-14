(function () {
    'use strict';

    angular.module('cloudSampleApp')
        .factory('appHttpInterceptor', function (SecurityService) {
            return {
                request: function (config) {
                    SecurityService.redirectIfJwtTokenNotFound();
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
