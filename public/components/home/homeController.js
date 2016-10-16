viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl'
    });
}]);

viewsModule.controller('HomeCtrl', function($scope) {

});
