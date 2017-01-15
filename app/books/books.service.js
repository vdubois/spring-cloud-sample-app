(function () {
    "use strict";

    angular.module('cloudSampleApp')
        .service('BooksService', function ($http, properties) {
            return {
                findAll: findAll,
                findOneByIsbn: findOneByIsbn
            };

            function findAll() {
                return $http.get(properties.apiBaseUrl + "/books");
            }

            function findOneByIsbn(isbn) {
                return $http.get(properties.apiBaseUrl + "/books/" + isbn);
            }
        });
})();