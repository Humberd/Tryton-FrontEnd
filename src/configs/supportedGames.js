(function() {
	"use strict";

	angular.module("TrytonApp.Configs")
		.config(SupportedGamesConfig);

	function SupportedGamesConfig(SupportedProvider) {
		SupportedProvider.games.add("League of Legends", "LoL", true);
	}
})();