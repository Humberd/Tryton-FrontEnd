(function() {
	"use strict";

	angular.module("TrytonApp.Loader.Templates")
		.directive("loaderTemplatesLoading", LoadingDirective);

	function LoadingDirective(ViewUrl) {
		return {
			templateUrl: ViewUrl + "loaderLoading.html"
		}
	}
})();