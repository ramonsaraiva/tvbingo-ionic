
var services = angular.module('services', []);

services.factory('CardService', function() {
	var card = {};
	var lines = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	return {
		take_card: function() {
			return card;
		},
		store_card: function(c) {
			card = null;
			card = c;
			console.log(card['1']);
		},
		test_card: function() {
			return {'1': {'2': 14, '3': 24, '4':38, '5':43, '9':88},
					'2': {'2': 13, '4':33, '7':68, '8':77, '9':90},
					'3': {'1': 7, '6':59, '7':66, '8':79, '9':82}};
		},
		get_lines: function() {
			return lines;
		}
	};
});
