(function() {
    "use strict";

    angular.module("TrytonApp.Configs")
        .config(SupportedGamesConfig);

    function SupportedGamesConfig(SupportedProvider) {
        var lol = {
            name: "League of Legends",
            shortName: "LoL",
            simpleShortName: "lol",
            isAvailable: true,
            iconUrl: "lol.png"
        }
        var csgo = {
            name: "Counter String: Global Offensive",
            shortName: "CS:GO",
            simpleShortName: "csgo",
            isAvailable: true,
            iconUrl: "csgo.png"
        }
        SupportedProvider.games.add(lol);
        SupportedProvider.games.add(csgo);
    }
})();
