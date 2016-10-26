export function signupRoute($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: './components/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
    });
}

export default class SignupCtrl {
    constructor(CollectionAppService) {
        this.CollectionAppService = CollectionAppService;
        this.email = ''; // Bound to the email input field in signup view
        this.username = ''; // Bound to the username input field in signup view
        this.password = ''; // Bound to the password input field in signup view
        this.confirmPassword = ''; // Bound to the confirmPassword input field in signup view
    }

    /* Creates a new user by calling the userSignup() function from the CollectionAppService service */
    signUp() {
        this.CollectionAppService.userSignup(this.email, this.username, this.password).then(data => {
            console.log(data);
        });
    }
}
