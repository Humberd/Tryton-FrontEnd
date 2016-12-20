(function () {
	"use strict";

	angular.module("TrytonApp.Configs")
		.config(Config);

	function Config(timeAgoSettings) {
    	timeAgoSettings.allowFuture = true;
	}
})();