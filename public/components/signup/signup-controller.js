export function signupRoute($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: './components/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
    });
}

export default class SignupCtrl {
    constructor() {
        this.stuff = 'sign up page';
    }
}
