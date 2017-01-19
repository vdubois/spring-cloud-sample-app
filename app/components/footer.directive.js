(function () {
    angular.module('cloudSampleApp').directive('cloudAppFooter', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/footer.tpl.html',
            scope: false,
            bindToController: false
        }
    })
})();