(function () {
    var booksListCtrl = function (BooksService) {
        var vm = this;
        vm.books = [];

        vm.activate();
        
        vm.activate = function () {
            BooksService.findAll().then(function (result) {
                console.log(result);
                vm.books = result.data;
            });
        }
    };

    angular.module('cloudSampleApp').controller('booksListCtrl', booksListCtrl);
})();
