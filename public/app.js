import angular from 'angular';
import ngRoute from 'angular-route';
import viewsModule from './views';
import CollectionCtrl, { collectionRoute } from './components/collection/collection-controller';
import CardInfoCtrl, { cardInfoRoute } from './components/card-info/card-info-controller';
import ResultsCtrl, { resultsRoute } from './components/results/results-controller';
import LoginCtrl, { loginRoute } from './components/login/login-controller';
import SignupCtrl, { signupRoute } from './components/signup/signup-controller';
import search from './components/search/search-directive';
import CollectionAppService from './collection-app-service';

var collectionApp = angular.module('collectionApp', ['collectionAppViews', search, 'ngRoute'])
    .config(collectionRoute)
    .controller('CollectionCtrl', CollectionCtrl)
    .config(cardInfoRoute)
    .controller('CardInfoCtrl', CardInfoCtrl)
    .config(resultsRoute)
    .controller('ResultsCtrl', ResultsCtrl)
    .config(loginRoute)
    .controller('LoginCtrl', LoginCtrl)
    .config(signupRoute)
    .controller('SignupCtrl', SignupCtrl)
    .service('CollectionAppService', CollectionAppService)
    .config(function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/collection'
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
