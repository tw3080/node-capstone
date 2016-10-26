// TODO: Make route /card-info/:id like in countries and capitals app?
export function cardInfoRoute($routeProvider) {
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

        this.getCardInfo();
    }

    /* Gets information about a specific card based on its value from the route parameter's id */
    getCardInfo() {
        /* Setting 'this' to a variable so it can be used in the nested scope */
        let controller = this;

        this.CollectionAppService.getCardById(this.id).then(function(response) {
            controller.card = response;
        });
    }
}
