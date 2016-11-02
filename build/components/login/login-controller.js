export function loginRoute($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: './components/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    });
}

export default class LoginCtrl {
    constructor(CollectionAppService, $location) {
        this.CollectionAppService = CollectionAppService;
        this.location = $location; // Setting '$location' to a variable in order to use it outside the constructor function
        this.username = ''; // Bound to username input field in login view
        this.password = ''; // Bound to password input field in login view
    }

    /* Logs the user into their account */
    login() {
        let $location = this.location; // Setting 'this.location' to a variable in order to use it to redirect the user within the scope of this login() function

        this.CollectionAppService.userLogin(this.username, this.password).then(data => {
            this.CollectionAppService.user = data;
            $location.path('/collection'); // On successful login, redirect the user to their collection page
        });
    }

    /* Logs the user out */
    logout() {
        this.CollectionAppService.logout();
    }
}
