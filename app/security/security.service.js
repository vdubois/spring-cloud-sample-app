(function () {
    angular.module('cloudSampleApp')
        .service('SecurityService', function (localStorageService, $location, properties, $injector) {
            var httpService;
            return {
                redirectToLoginPageIfJwtTokenNotFound: redirectToLoginPageIfJwtTokenNotFound,
                saveJwtToken: saveJwtToken,
                getJwtToken: getJwtToken,
                redirectToLoginPageWhenUnauthorized: redirectToLoginPageWhenUnauthorized,
                authenticate: authenticate
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
                if (httpCode === 401 || httpCode === 403 || httpCode === -1) {
                    $location.url(properties.loginUrl);
                }
            }

            function authenticate(email, password) {
                if (!httpService) {
                    httpService = $injector.get('$http');
                }
                return httpService.post(properties.apiBaseUrl + "/authenticate", {email: email, password: password});
            }
        });
})();