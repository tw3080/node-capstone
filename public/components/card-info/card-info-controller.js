export function cardInfoRoute($routeProvider) {
    $routeProvider.when('/card-info/:id/:_id', {
        templateUrl: 'components/card-info/card-info.html',
        controller: 'CardInfoCtrl',
        controllerAs: 'cardInfo'
    });
    $routeProvider.when('/card-info/:id', {
        templateUrl: 'components/card-info/card-info.html',
        controller: 'CardInfoCtrl',
        controllerAs: 'cardInfo'
    });
}

export default class CardInfoCtrl {
    constructor(CollectionAppService, $routeParams) {
        this.CollectionAppService = CollectionAppService;
        this.id = $routeParams.id; // Set the id variable equal to the value of the route parameter's id
        this._id = $routeParams._id; // Set the id variable equal to the value of the route parameter's _id

        // These values determine what color the add/remove buttons should be; if false, the button(s) will have the standard style, but if true, the button(s) will turn green (card added) or red (card removed)
        this.cardAdded = false;
        this.cardRemoved = false;

        this.getCardInfo();
    }

    // Gets information about a specific card based on its value from the route parameter's id
    getCardInfo() {
        // Setting 'this' to a variable so it can be used in the nested scope
        let controller = this;

        this.CollectionAppService.getCardById(this.id).then(function(response) {
            controller.card = response;
        });
    }

    // Adds the current card to the user's collection
    addCard() {
        let controller = this;

        this.CollectionAppService.addToCollection(this.card).then(function(response) {
            controller.cardAdded = true;
        });
    }

    removeCard() {
        let controller = this;

        this.CollectionAppService.removeFromCollection(this._id).then(function(response) {
            controller.cardRemoved = true;
        });
    }
}
