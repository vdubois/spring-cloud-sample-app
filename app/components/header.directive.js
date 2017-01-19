(function () {
    angular.module('cloudSampleApp').directive('cloudAppHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/header.tpl.html',
            scope: false,
            bindToController: false
        }
    })
})();