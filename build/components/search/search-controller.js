export function searchRoute($routeProvider) {
    $routeProvider.when('/search', {
        templateUrl: 'components/search/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
    });
}

export default class SearchCtrl {
    constructor(CollectionAppService, $scope, $location) {
        this.location = $location; // Setting '$location' to a variable in order to use it outside the constructor function
        this.CollectionAppService = CollectionAppService;
        this.cardName = '';
    }

    // Submit the search
    submit(cardName, valid) {
        // If the form is valid, get the list of cards
        if (valid) {
            this.CollectionAppService.getCardsByName(cardName);
        }
    }

    // Redirect the user to the info page for the specific card they click on
    getCardInfo(id) {
        let $location = this.location; // Setting 'this.location' to a variable in order to use it to redirect the user within the scope of this getCardInfo() function
        $location.path('/card-info/' + id);
    }
}
