(function() {
    "use strict";

    angular.module("TrytonApp", ["TrytonApp.Configs", "TrytonApp.Storage", 
    	"TrytonApp.Api", "TrytonApp.Translate", "TrytonApp.Loader", "TrytonApp.Logger",
        "ui.bootstrap", "TrytonApp.Authentication", "ngMaterial",
        "TrytonApp.Modal", "TrytonApp.Router", "TrytonApp.Session",
        "TrytonApp.Toasts", "ngAnimate", "TrytonApp.Directives",
        "TrytonApp.SelectedGame", "TrytonApp.MyTabs"
    ]);
})();
