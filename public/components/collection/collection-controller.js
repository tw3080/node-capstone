export function collectionRoute($routeProvider) {
    $routeProvider.when('/collection', {
        templateUrl: 'components/collection/collection.html',
        controller: 'CollectionCtrl',
        controllerAs: 'collection'
    });
}

export default class CollectionCtrl {
    constructor() {
        this.MOCK_USER_INFO = {
            "username": "username",
            "collectionSize": "11111",
            "collection": [
                {
                    "card": {
                        "id": "xy7-54",
                        "name": "Gardevoir",
                        "imageUrl": "https://s3.amazonaws.com/pokemontcg/xy7/54.png",
                        "subtype": "Stage 2",
                        "supertype": "Pokémon"
                    }
                },
                {
                    "card": {
                        "id": "xy7-54",
                        "name": "Gardevoir",
                        "imageUrl": "https://s3.amazonaws.com/pokemontcg/xy7/54.png",
                        "subtype": "Stage 2",
                        "supertype": "Pokémon"
                    }
                },
                {
                    "card": {
                        "id": "xy7-54",
                        "name": "Gardevoir",
                        "imageUrl": "https://s3.amazonaws.com/pokemontcg/xy7/54.png",
                        "subtype": "Stage 2",
                        "supertype": "Pokémon"
                    }
                }
            ]
        };
    }
}
