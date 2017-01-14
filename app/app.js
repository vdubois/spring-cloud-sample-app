(function () {
    'use strict';

    angular.module('cloudSampleApp', ['ui.router', 'LocalStorageModule'])
        .config(function($urlRouterProvider, $stateProvider, $httpProvider, localStorageServiceProvider) {

            $urlRouterProvider.otherwise('/');
            $stateProvider.state('books-list',  {
                url: '/',
                templateUrl: 'books-list/list.tpl.html',
                controller: 'booksListCtrl',
                controllerAs: 'booksList'
            });
            $httpProvider.interceptors.push('appHttpInterceptor');
            localStorageServiceProvider.setPrefix('cloudSampleApp');
            localStorageServiceProvider.setStorageType('localStorage');
            localStorageServiceProvider.setNotify(true, true);
        });
})();
