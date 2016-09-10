(function() {
    "use strict";

    angular.module("TrytonApp.Storage")
        .service("Storage", StorageFactory);

    function StorageFactory(Cookies, LocalStorage, SessionStorage, SelectedGameStorageKey) {
    	// (function(Storage) {

    	// })(this);
    	(function SelectedGame(Storage) {
    		var key = SelectedGameStorageKey;
    		var storage = LocalStorage;

    		Storage.getSelectedGame = function () {
    			return storage.get(key);
    		};
    		Storage.setSelectedGame = function (gameName) {
    			storage.set(key, gameName);
    		}
    	})(this);
    }
})();
