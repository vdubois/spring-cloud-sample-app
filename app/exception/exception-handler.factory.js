(function () {
    angular.module('cloudSampleApp')
        .factory('$exceptionHandler', function() {
            return function(exception) {
                if(exception.message.match(/transition (superseded|prevented|aborted|failed)/)) {
                    return;
                }
            };
        });
})();