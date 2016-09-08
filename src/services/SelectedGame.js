(function() {
    "use strict";

    angular.module("TrytonApp.SelectedGame", [])
        .factory("SelectedGame", SelectedGameFactory);

    function SelectedGameFactory(Supported, Logger, $rootScope) {
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

                //sprawdza czy mam taka gre we wspieranych
                var game = Supported.games.get(gameName);

                if (!game) {
                    throw "Game with this name: " + gameName + " doesn't exist";
                }
                if (!game.isAvailable) {
                    throw "Game: " + gameName + " is not currently available";
                }

                var oldGame = selectedGame;
                selectedGame = game.simpleShortName;
                if (oldGame !== selectedGame) {
                    Logger.info("Successfully changed game to [%s]", selectedGame);
                    $rootScope.$broadcast("SelectedNewGame", selectedGame);
                }
            },
            is: function(compareName) {
                return compareName.toLowerCase() === selectedGame;
            }
        };
        return interf;
    }
})();
