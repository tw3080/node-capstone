export function resultsRoute($routeProvider) {
    $routeProvider.when('/results', {
        templateUrl: 'components/results/results.html',
        controller: 'ResultsCtrl',
        controllerAs: 'results'
    });
}

export default class ResultsCtrl {
    constructor() {
        this.MOCK_SEARCH_RESULTS = {
            id: 'xy7-54',
            name: 'Gardevoir',
            nationalPokedexNumber: 282,
            imageUrl: 'https://s3.amazonaws.com/pokemontcg/xy7/54.png',
            subtype: 'Stage 2',
            supertype: 'Pokémon',
            ability: {
                name: 'Bright Heal',
                text: 'Once during your turn (before your attack), you may heal 20 damage from each of your Pokémon.',
                type: 'Ability'
            },
            hp: '130',
            retreatCost: [
                'Colorless',
                'Colorless'
            ],
            number: '54',
            artist: 'TOKIYA',
            rarity: 'Rare Holo',
            series: 'XY',
            set: 'Ancient Origins',
            setCode: 'xy7',
            types: [
                'Fairy',
                'Psychic'
            ],
            attacks: [
                {
                cost: [
                    'Colorless',
                    'Colorless',
                    'Colorless'
                ],
                name: 'Telekinesis',
                text: 'This attack does 50 damage to 1 of your opponent\'s Pokémon. This attack\'s damage isn\'t affected by Weakness or Resistance.',
                damage: '',
                convertedEnergyCost: 3
                }
            ],
            weaknesses: [
                {
                    type: 'Metal',
                    value: '×2'
                }
            ],
            resistances: [
                {
                    type: 'Darkness',
                    value: '-20'
                }
            ]
        };
    }
}
