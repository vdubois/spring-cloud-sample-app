(function () {
    'use strict';

    angular.module('cloudSampleApp', ['ui.router', 'LocalStorageModule'])
        .config(function($urlRouterProvider, $stateProvider, $httpProvider, localStorageServiceProvider, properties) {

            $urlRouterProvider.otherwise('/');
            $stateProvider.state('books-list', {
                url: '/',
                templateUrl: 'books/list.tpl.html',
                controller: 'booksListCtrl',
                controllerAs: 'booksList'
            });
            $stateProvider.state('login', {
                url: properties.loginUrl,
                templateUrl: 'login/login.tpl.html',
                controller: 'loginCtrl',
                controllerAs: 'login'
            });
            $httpProvider.interceptors.push('appHttpInterceptor');
            localStorageServiceProvider.setPrefix('cloudSampleApp');
            localStorageServiceProvider.setStorageType('localStorage');
            localStorageServiceProvider.setNotify(true, true);
        });
})();
