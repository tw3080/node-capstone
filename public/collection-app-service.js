import angular from 'angular';

export default class CollectionAppService {
    constructor($http) {
        this.http = $http;
    }

    getCardByName() {
        console.log('get card by name');
        let http = this.http;
        return http({
            method: 'GET',
            url: '/cards',
            cache: true,
        });
    }
}
