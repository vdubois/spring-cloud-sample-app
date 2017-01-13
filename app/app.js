'use strict';

angular.module('cloudSampleApp', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider.state('books-list',  {
            url: '/',
            templateUrl: 'books-list/list.tpl.html',
            controller: 'booksListCtrl',
            controllerAs: 'booksList'
        });
    });
