import angular from 'angular';

export default class CollectionAppService {
    constructor($http) {
        this.$http = $http;
    }

    /* Gets a list of cards by name of Pokemon */
    getCardsByName(name) {
        this.params = {
            name: name
        };

        var controller = this;

        return this.$http({
            method: 'GET',
            url: 'https://api.pokemontcg.io/v1/cards',
            params: this.params
        }).then(function(response) {
            controller.searchResults = response.data.cards;
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

    /* Testing */
    getCollection() {
        return this.$http({
            method: 'GET',
            url: '/test'
        });
    }
}
