(function () {
    "use strict";

    angular.module("TrytonApp.Services", ["TrytonApp.Storage", "TrytonApp.Api", "TrytonApp.Authentication",
		"TrytonApp.Experience", "TrytonApp.Logger", "TrytonApp.Modal", "TrytonApp.SelectedGame",
		"TrytonApp.Session"
	]);
})();