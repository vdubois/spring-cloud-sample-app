(function () {
    var loginCtrl = function (SecurityService, $location) {
        var vm = this;
        vm.email = '';
        vm.password = '';

        vm.authenticate = function () {
            SecurityService.authenticate(vm.email, vm.password).then(function (result) {
                if (result.status === 200 && result.data.token) {
                    SecurityService.saveJwtToken(result.data.token);
                    $location.url('/');
                } else {
                    toastr.error('Error authenticating user');
                    console.error(result.data.message);
                }
            }, function (error) {
                toastr.error('Error authenticating user');
                console.error(error.data.message);
            });
        }
    };
    angular.module('cloudSampleApp').controller('loginCtrl', loginCtrl);
})();