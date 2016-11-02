import angular from 'angular';

function search() {
    return {
        restrict: 'E',
        templateUrl: './components/search/search-template.html',
        scope: {
            submit: '=submit',
            CollectionAppService: '=service'
        },
        link: function(scope, element, attrs) {
            this.CollectionAppService = scope.CollectionAppService;
        }
    };
}

export default angular.module('search', [])
    .directive('search', search)
    .name;
