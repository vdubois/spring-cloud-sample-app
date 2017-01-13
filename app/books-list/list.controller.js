var booksListCtrl = function () {
    var vm = this;
    vm.books = [];
};

angular.module('cloudSampleApp').controller('booksListCtrl', booksListCtrl);