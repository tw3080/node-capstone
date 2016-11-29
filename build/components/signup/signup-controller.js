export function signupRoute($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: './components/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
    });
}

export default class SignupCtrl {
    constructor(CollectionAppService, $location) {
        this.CollectionAppService = CollectionAppService;
        this.location = $location; // Setting '$location' to a variable in order to use it outside the constructor function
        this.username = ''; // Bound to the username input field in signup view
        this.password = ''; // Bound to the password input field in signup view
        this.isDuplicate = false; // For displaying an error message about a username already being registered. If false, username is not registered; if true, username is already registered and the user must pick a different username
    }

    // Creates a new user by calling the userSignup() function from the CollectionAppService service
    signUp() {
        let $location = this.location; // Setting 'this.location' to a variable in order to use it to redirect the user within the scope of this signUp() function

        this.CollectionAppService.userSignup( this.username, this.password).then(data => {
            $location.path('/login'); // On successful signup, redirect the user to the login page
        }, data => {
            // If the username is already registered, alert the user
            if (data.data.message == 'Username is already taken') {
                this.isDuplicate = true; // Set to true because the username is already registered
            }
        });
    }
}
