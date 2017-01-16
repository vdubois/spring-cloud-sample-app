'use strict';

describe('test/spec/books/controllers/list.controller.spec.js', function () {
    var $controller;

    // load the controller's module
    beforeEach(module('cloudSampleApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    it('should define books', function () {
        var $scope = {};
        var controller = $controller('booksListCtrl', {$scope: $scope});
        expect(controller.books).toBeDefined();
    });
});
