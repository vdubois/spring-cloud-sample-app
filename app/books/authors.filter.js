(function () {
    angular.module('cloudSampleApp').filter('authors', function () {
        return function (authors) {
            return authors.map(function (author) {
                return author.name;
            }).join(', ');
        }
    })
})();