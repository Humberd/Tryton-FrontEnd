(function() {
    "use strict";

    angular.module("TrytonApp.SelectedGame", [])
        .factory("SelectedGame", SelectedGameFactory);

    function SelectedGameFactory() {
        var selectedGame = "lol";
        var interf = {
            get: function() {
                return selectedGame;
            },
            set: function(gameName) {
                if (!angular.isString(gameName)) {
                    throw "Game name must be a string";
                }
                if (gameName.length === 0) {
                    throw "Game name cannot by empty";
                }
                selectedGame = gameName.toLowerCase();
            },
            is: function(compareName) {
                return compareName.toLowerCase() === selectedGame;
            }
        };
        return interf;
    }
})();
