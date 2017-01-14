(function () {
    angular.module('cloudSampleApp')
        .service('SecurityService', function (localStorageService, $location, properties) {
            return {
                redirectToLoginPageIfJwtTokenNotFound: redirectToLoginPageIfJwtTokenNotFound,
                saveJwtToken: saveJwtToken,
                getJwtToken: getJwtToken,
                redirectToLoginPageWhenUnauthorized: redirectToLoginPageWhenUnauthorized
            };

            function redirectToLoginPageIfJwtTokenNotFound() {
                var jwtToken = localStorageService.get(properties.securityToken);
                if (!jwtToken) {
                    $location.url(properties.loginUrl);
                    return true;
                }
                return false;
            }

            function saveJwtToken(jwtToken) {
                localStorageService.set(properties.securityToken, jwtToken);
            }

            function getJwtToken() {
                return localStorageService.get(properties.securityToken);
            }

            function redirectToLoginPageWhenUnauthorized(httpCode) {
                if (httpCode === 401) {
                    $location.url(properties.loginUrl);
                }
            }
        });
})();