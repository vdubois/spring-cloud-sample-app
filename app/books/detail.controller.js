(function () {
    var bookDetailCtrl = function (BooksService, $stateParams) {
        var vm = this;
        vm.book = {};

        BooksService.findOneByIsbn($stateParams.isbn).then(function (result) {
            vm.book = result.data;
        })
    };
    angular.module('cloudSampleApp').controller('bookDetailCtrl', bookDetailCtrl);
})();