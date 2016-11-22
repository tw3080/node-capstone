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

        this.badCredentials = false; // For displaying an error message when the user enters incorrect login credentials
    }

    /* Logs the user into their account */
    login() {
        let $location = this.location; // Setting 'this.location' to a variable in order to use it to redirect the user within the scope of this login() function

        this.CollectionAppService.userLogin(this.username, this.password).then(data => {
            this.CollectionAppService.user = data;
            $location.path('/collection'); // On successful login, redirect the user to their collection page
        }, data => {
            // If the username is already registered, alert the user
            if (data.data.message == 'Incorrect username' || 'Incorrect password') {
                this.badCredentials = true; // Set to true because login credentials don't match any existing user
            }
        });
    }

    /* Logs the user out */
    logout() {
        this.CollectionAppService.logout();
    }
}
