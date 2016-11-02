export function collectionRoute($routeProvider) {
    $routeProvider.when('/collection', {
        templateUrl: 'components/collection/collection.html',
        controller: 'CollectionCtrl',
        controllerAs: 'collection'
    });
}

export default class CollectionCtrl {
    constructor(CollectionAppService, $scope) {
        let controller = this;
        CollectionAppService.getCollection().then(data => {
            controller.collection = data.data;
        });
    }
}
