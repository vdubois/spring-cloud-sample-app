(function () {
    'use strict';

    try {
        angular.module("templates");
    } catch (err) {
        angular.module('templates', []);
    }

    angular.module('cloudSampleApp', ['ui.router', 'LocalStorageModule', 'templates'])
        .config(function($urlRouterProvider, $stateProvider, $httpProvider, localStorageServiceProvider, properties) {

            $urlRouterProvider.otherwise('/');
            $stateProvider.state('books-list', {
                url: '/',
                templateUrl: 'books/list.tpl.html',
                controller: 'booksListCtrl',
                controllerAs: 'booksList'
            });
            $stateProvider.state('book-detail', {
                url: '/books/:isbn',
                templateUrl: 'books/detail.tpl.html',
                controller: 'bookDetailCtrl',
                controllerAs: 'bookDetail'
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
