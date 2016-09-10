(function() {
    "use strict";

    angular.module("TrytonApp.Configs")
        .constant("ViewUrl", "html/")
        .constant("GamesIconsUrl", "resources/gamesIcons/")
        .constant("ApiUrl", "http://www.example.com/")

    .constant("DefaultSelectedGame", "lol")
    .constant("SelectedGameStorageKey", "selectedGame")
})();
