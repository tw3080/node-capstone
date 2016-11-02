export function homeRoute($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
    });
}

export default class HomeCtrl {
    constructor(CollectionAppService) {
        this.CollectionAppService = CollectionAppService;
    }
}
