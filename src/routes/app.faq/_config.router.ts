import {FaqController} from "./faq.controller";
(function () {
    "use strict";

    angular.module("TrytonApp.Router.App.Faq")
		.config(FaqConfig);

    function FaqConfig($stateProvider, ViewUrl) {
    	$stateProvider.state("app.faq", {
    		url: "/faq",
			templateUrl: ViewUrl + "faq.html",
			controller: FaqController,
			controllerAs: "ctrl"
		})
	}
})();