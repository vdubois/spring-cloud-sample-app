(function () {
    'use strict';

    angular.module('cloudSampleApp')
        .constant('properties', {
            securityToken: 'cloudSample-app-jwt-token',
            loginUrl: '/login'
        });
})();
