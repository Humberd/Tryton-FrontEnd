(function () {
	"use strict";

	angular.module("TrytonApp.Configs")
		.service("Recaptcha", Recaptcha);

	function Recaptcha($urlMatcherFactory, RecaptchaUrl, ScriptLoader) {
		this.changeLangugage = function (lang) {
			var url = parseUrl(lang);
			loadScript(url);
		};

		function parseUrl(lang) {
			var options = {
				hl: lang,
				onload: "vcRecaptchaApiLoaded",
				render: "explicit"
			};
			var url = $urlMatcherFactory.compile(RecaptchaUrl);
			return url.format(options);
		}

		function loadScript(url) {
			ScriptLoader.loadScript(url, "recaptcha");
		}
	}
})();