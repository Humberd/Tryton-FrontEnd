(function () {
    "use strict";

    angular.module("TrytonApp.Configs")
		.config(ThemeConfig);

    function ThemeConfig($mdThemingProvider) {
    	$mdThemingProvider.theme("forms-dark", "default")
			.primaryPalette('light-blue')
			.dark();
	}
})();