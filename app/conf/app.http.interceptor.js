(function () {
    'use strict';

    angular.module('cloudSampleApp')
        .factory('appHttpInterceptor', function (SecurityService) {
            return {
                request: function (config) {
                    if (!SecurityService.redirectToLoginPageIfJwtTokenNotFound()) {
                        config.headers.authorization = SecurityService.getJwtToken();
                    }
                    return config;
                },

                requestError: function (config) {
                    return config;
                },

                response: function (res) {
                    SecurityService.redirectToLoginPageWhenUnauthorized(res.status);
                    return res;
                },

                responseError: function (res) {
                    SecurityService.redirectToLoginPageWhenUnauthorized(res.status);
                    return res;
                }
            }
        });
})();
