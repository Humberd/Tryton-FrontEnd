(function() {
    "use strict";

    angular.module("TrytonApp.Configs")
        .config(SupportedLanguagesConfig);

    function SupportedLanguagesConfig(SupportedProvider) {
    	var pl = {
    		name: "Polski",
    		shortName: "PL",
    		simpleShortName: "pl",
    		isAvailable: true,
    		iconUrl: "pl"
    	};
    	var gb = {
    		name: "English",
    		shortName: "EN",
    		simpleShortName: "en",
    		isAvailable: true,
    		iconUrl: "gb"
    	};
    	var fr = {
    		name: "Français",
    		shortName: "FR",
    		simpleShortName: "fr",
    		isAvailable: false,
    		iconUrl: "fr"
    	};
        SupportedProvider.languages.add(pl);
        SupportedProvider.languages.add(gb);
        SupportedProvider.languages.add(fr);
    }
})();
