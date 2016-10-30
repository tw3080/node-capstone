import angular from 'angular';

export default class CollectionAppService {
    constructor($http) {
        this.$http = $http;
    }

    /* Gets a list of cards by name of Pokemon */
    getCardsByName(name) {
        var controller = this;
        controller.showResults = false; // If false, don't show the search results

        this.params = {
            name: name
        };

        return this.$http({
            method: 'GET',
            url: 'https://api.pokemontcg.io/v1/cards',
            params: this.params
        }).then(function(response) {
            controller.searchResults = response.data.cards;
            controller.showResults = true; // If true, show the search results
            return response.data.cards;
        });
    }

    /* Gets a card by its unique id and returns a single card */
    getCardById(id) {
        this.id = id;

        return this.$http({
            method: 'GET',
            url: 'https://api.pokemontcg.io/v1/cards/' + id,
            cache: true
        }).then(function(response) {
            console.log(response.data.card);
            return response.data.card;
        });
    }

    /* Creates a new account */
    userSignup(email, username, password) {
        return this.$http({
            method: 'POST',
            url: '/users',
            data: {
                email: email,
                username: username,
                password: password
            }
        });
    }

    /* Logs the user in */
    userLogin(username, password) {
        return this.$http({
            method: 'POST',
            url: '/login',
            data: {
                username: username,
                password: password
            }
        });
    }

    /* Adds a card to the user's collection */
    addToCollection(card) {
        return this.$http({
            method: 'POST',
            url: '/collection',
            data: {
                card: card
            }
        });
    }

    /* Gets the user's collection */
    getCollection() {
        return this.$http({
            method: 'GET',
            url: '/collection'
        });
    }
}
