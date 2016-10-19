export function loginRoute($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: './components/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    });
}

export default class LoginCtrl {
    constructor() {
        this.stuff = 'login page';
    }
}
