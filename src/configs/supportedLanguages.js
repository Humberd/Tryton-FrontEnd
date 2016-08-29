(function() {
    "use strict";

    angular.module("TrytonApp.Configs")
        .config(SupportedLanguagesConfig);

    function SupportedLanguagesConfig(SupportedProvider) {
        SupportedProvider.languages.add("Polski", "PL", true, "pl");
        SupportedProvider.languages.add("English", "EN", true, "gb");
        SupportedProvider.languages.add("Français", "FR", false, "fr");
    }
})();
