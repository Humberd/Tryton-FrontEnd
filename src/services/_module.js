(function () {
    "use strict";

    angular.module("TrytonApp.Services", [
    	"TrytonApp.Toast",
    	"TrytonApp.Storage",
		"TrytonApp.ScriptLoader",
		"TrytonApp.Api",
		"TrytonApp.Authentication",
		"TrytonApp.Experience",
		"TrytonApp.Logger",
		"TrytonApp.Modal",
		"TrytonApp.SelectedGame",
		"TrytonApp.Session"
	]);
})();