import angular from 'angular';

function search() {
    return {
        restrict: 'E',
        templateUrl: './components/search/search.html',
        scope: {

        },
        link: function(scope, element, attrs) {
            scope.stuff = 'whatever';
        }
    };
}

export default angular.module('search', [])
    .directive('search', search)
    .name;
