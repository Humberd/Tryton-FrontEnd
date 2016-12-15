(function () {
	"use strict";

	angular.module("TrytonApp.Storage")
		.service("Storage", StorageFactory);

	function StorageFactory(Cookies, LocalStorage, SessionStorage,
							SelectedGameStorageKey, UserTokenStorageKey) {
		(function SelectedGame(Storage) {
			var key = SelectedGameStorageKey;
			var storage = LocalStorage;

			Storage.getSelectedGame = function () {
				return storage.get(key);
			};
			Storage.setSelectedGame = function (gameName) {
				storage.set(key, gameName);
			};
		})(this);

		(function UserTokenModel(Storage) {
			var key = UserTokenStorageKey;
			var storage = LocalStorage;

			Storage.getUserTokenModel = function () {
				return storage.get(key);
			};
			Storage.setUserTokenModel = function (userTokenModel) {
				storage.set(key, userTokenModel);
			};

		})(this);
	}
})();
