(function() {
	"use strict";

	angular.module("TrytonApp.Configs")
		.config(SupportedGamesConfig);

	function SupportedGamesConfig(SupportedProvider) {
		SupportedProvider.games.add("League of Legends", "LoL", true, "lol.png");
		SupportedProvider.games.add("Counter Strike: Global Offensive", "CS:GO",  true, "csgo.png");
	}
})();