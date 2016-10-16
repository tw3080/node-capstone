var collectionApp = angular.module('collectionApp', ['collectionAppViews', 'ngRoute'])
    .config(function($routeProvider) {
        /* If the user tries to go to any route other than one which is already defined, redirect them to the home page */
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });

/*
var $ = require('jquery');
var angular = require('angular');
var app = angular.module('pokemonApp', []);

app.factory('getAllCards', ['$http', function($http) {
    return function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/',
            cache: true,
        })
        .then(function(response) {
            console.log(response);
            return response;
        });
    };
}]);

app.controller('PokemonCtrl', function(getAllCards) {
    var cards = getAllCards();
});
*/
