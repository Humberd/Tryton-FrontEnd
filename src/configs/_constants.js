(function() {
    "use strict";

    angular.module("TrytonApp.Configs")
        .constant("ViewUrl", "html/")
        .constant("GamesIconsUrl", "resources/gamesIcons/")
        .constant("RawApiUrl", "http://www.example.com/:game/")

    .constant("DefaultSelectedGame", "lol")
    .constant("SelectedGameStorageKey", "selectedGame")
})();
