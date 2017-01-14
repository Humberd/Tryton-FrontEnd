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
            iconUrl: "https://i.imgur.com/xNLs83T.png"
        };
        var dota2 = {
            name: "Dota 2",
			shortName: "Dota2",
			simpleShortName: "dota2",
			isAvailable: true,
			iconUrl: "http://orig11.deviantart.net/ace7/f/2014/103/1/b/dota_2_by_polishxcii-d7ea6me.png"
        };
        var csgo = {
            name: "Counter String: Global Offensive",
            shortName: "CS:GO",
            simpleShortName: "csgo",
            isAvailable: false,
            iconUrl: "csgo.png"
        };
        SupportedProvider.games.add(lol);
        SupportedProvider.games.add(csgo);
        SupportedProvider.games.add(dota2);
    }
})();
