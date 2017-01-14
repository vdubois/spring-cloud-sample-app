(function () {
    'use strict';

    angular.module('cloudSampleApp')
        .value('properties', {
            securityToken: 'cloudSample-app-jwt-token',
            loginUrl: '/login'
        });
})();
