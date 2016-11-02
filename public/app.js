import angular from 'angular';
import ngRoute from 'angular-route';
import ngMessage from 'angular-messages';
import viewsModule from './views';
import HomeCtrl, { homeRoute } from './components/home/home-controller';
import CollectionCtrl, { collectionRoute } from './components/collection/collection-controller';
import SearchCtrl, { searchRoute } from './components/search/search-controller';
import CardInfoCtrl, { cardInfoRoute } from './components/card-info/card-info-controller';
import LoginCtrl, { loginRoute } from './components/login/login-controller';
import SignupCtrl, { signupRoute } from './components/signup/signup-controller';
import search from './components/search/search-directive';
import CollectionAppService from './collection-app-service';

var collectionApp = angular.module('collectionApp', ['collectionAppViews', search, 'ngRoute', 'ngMessages'])
    .config(homeRoute)
    .controller('HomeCtrl', HomeCtrl)
    .config(collectionRoute)
    .controller('CollectionCtrl', CollectionCtrl)
    .config(searchRoute)
    .controller('SearchCtrl', SearchCtrl)
    .config(cardInfoRoute)
    .controller('CardInfoCtrl', CardInfoCtrl)
    .config(loginRoute)
    .controller('LoginCtrl', LoginCtrl)
    .config(signupRoute)
    .controller('SignupCtrl', SignupCtrl)
    .service('CollectionAppService', CollectionAppService)
    .config(function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
