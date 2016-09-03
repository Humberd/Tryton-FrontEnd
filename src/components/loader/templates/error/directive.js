(function() {
	"use strict";

	angular.module("TrytonApp.Loader.Templates")
		.directive("loaderTemplatesError", ErrorDirective);

	function ErrorDirective(ViewUrl) {
		return {
			templateUrl: ViewUrl + "loaderError.html"
		}
	}
})();