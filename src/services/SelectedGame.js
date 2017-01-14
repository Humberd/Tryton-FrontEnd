(function () {
	"use strict";

	angular.module("TrytonApp.SelectedGame", [])
		.factory("SelectedGame", SelectedGameFactory);

	function SelectedGameFactory(Supported, Logger, $rootScope,
								 DefaultSelectedGame, Storage, $urlMatcherFactory, RawApiUrl, ApiUrl,
								 Api, Session, $state) {

		var selectedGame;
		var interf = {
			get: function () {
				return selectedGame;
			},
			set: function (gameName) {
				if (gameName === selectedGame) {
					return;
				}
				if (!angular.isString(gameName)) {
					throw "Game name must be a string";
				}
				if (gameName.length === 0) {
					throw "Game name cannot by empty";
				}

				//sprawdza czy mam taka gre we wspieranych
				var game = checkIfSupported(gameName);

				var oldGame = selectedGame;
				selectedGame = game.simpleShortName;

				Storage.setSelectedGame(selectedGame);
				Logger.debug("Saved selected game [%s] in a Storage", selectedGame);
				setApiUrl(selectedGame);

				if (oldGame !== selectedGame) {
					Logger.info("Successfully changed game to [%s]", selectedGame);
					$rootScope.$broadcast("SelectedNewGame", selectedGame);
				}
			},
			is: function (compareName) {
				return compareName.toLowerCase() === selectedGame;
			}
		};

		function setApiUrl(gameName) {
			var rawUrl = $urlMatcherFactory.compile(RawApiUrl);
			ApiUrl = rawUrl.format({game: gameName});
			Logger.debug("Set Api url to: %s", ApiUrl);
		}

		function checkIfSupported(gameName) {
			var game = Supported.games.get(gameName);

			if (!game) {
				throw "Game with this name: " + gameName + " doesn't exist";
			}
			if (!game.isAvailable) {
				throw "Game: " + gameName + " is not currently available";
			}
			return game;
		}

		(function initDefaultGame() {
			var storageGame = Storage.getSelectedGame();

			if (!angular.isString(storageGame)) {
				interf.set(DefaultSelectedGame);
			} else {
				try {
					checkIfSupported(storageGame);
					interf.set(storageGame);
				} catch (err) {
					interf.set(DefaultSelectedGame);
				}
			}
		})();
		return interf;
	}
})();
