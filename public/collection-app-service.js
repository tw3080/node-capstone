import angular from 'angular';

export default class CollectionAppService {
    constructor($http, $timeout) {
        this.$http = $http;
        this.user = null;
    }

    // Gets a list of cards by name of Pokemon
    getCardsByName(name) {
        var controller = this;
        controller.showResults = false; // If false, don't show the search results
        controller.isLoading = true; // If true, show the loader animation on the search page

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
            controller.isLoading = false; // If false, hide the loader animation on the search page
            return response.data.cards;
        });
    }

    // Gets a card by its unique id and returns a single card
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
    userSignup(username, password) {
        return this.$http({
            method: 'POST',
            url: '/users',
            data: {
                username: username,
                password: password
            }
        });
    }

    // Logs the user in
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

    // Logs the user out
    logout() {
        this.user = null;
    }

    // Checks to see if the user is logged in and is used to display relevent information depending on whether the user is/isn't logged in
    isLoggedIn() {
        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

    // Gets the user's collection
    getCollection() {
        return this.$http({
            method: 'GET',
            url: '/collection'
        });
    }

    // Adds a card to the user's collection
    addToCollection(card) {
        var controller = this;
        controller.cardAddedMsg = false; // If false, don't show the message confirming the card was added to the collection

        return this.$http({
            method: 'POST',
            url: '/collection',
            data: {
                card: card
            }
        }).then(function(response) {
            controller.cardAddedMsg = true; // If true, show the message confirming the card was added to the collection
        });
    }

    // Removes a card from the user's collection
    removeFromCollection(card) {
        var controller = this;
        controller.cardRemovedMsg = false; // If false, don't show the message confirming the card was removed from the collection

        return this.$http({
            method: 'DELETE',
            url: '/collection/' + card,
            data: {
                card: card
            }
        }).then(function(response) {
            controller.cardRemovedMsg = true; // If true, show the message confirming the card was removed from the collection
        });
    }
}
