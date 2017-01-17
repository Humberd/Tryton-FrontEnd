(function() {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard", [
		"TrytonApp.Router.App._games.Dashboard.newTask",
		"TrytonApp.Router.App._games.Dashboard.verify",
		"TrytonApp.Router.App._games.Dashboard.cancelLolTask",
		"TrytonApp.Router.App._games.Dashboard.viewTaskLol",
		"TrytonApp.Router.App._games.Dashboard.dota2NewTask",
		"TrytonApp.Router.App._games.Dashboard.dota2Verify",
		"TrytonApp.Router.App._games.Dashboard.cancelDota2Task"
	]);
})();