(function () {
    angular.module('cloudSampleApp', function (localStorageService, $location, properties) {
        return {
            redirectIfJwtTokenNotFound: redirectIfJwtTokenNotFound,
            saveJwtToken: saveJwtToken
        };

        function redirectIfJwtTokenNotFound() {
            var jwtToken = localStorageService.get(properties.securityToken);
            if (!jwtToken) {
                $location.url('/login');
            }
        }

        function saveJwtToken(jwtToken) {
            localStorageService.set(properties.securityToken, jwtToken);
        }
    })
});