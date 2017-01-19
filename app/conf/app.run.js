(function () {
    'use strict';

    angular.module('cloudSampleApp')
        .run(function ($rootScope, localStorageService, properties) {
            $rootScope.authenticated = !!localStorageService.get(properties.securityToken);
        });
})();
