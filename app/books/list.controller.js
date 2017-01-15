(function () {
    var booksListCtrl = function (BooksService) {
        var vm = this;
        vm.books = [];

        BooksService.findAll().then(function (result) {
            vm.books = result.data;
        });
    };

    angular.module('cloudSampleApp').controller('booksListCtrl', booksListCtrl);
})();
