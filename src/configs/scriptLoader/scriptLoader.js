(function () {
    "use strict";

    angular.module("TrytonApp.Configs.ScriptLoader")
		.service("ScriptLoader", ScriptLoader);

	function ScriptLoader(Logger, $q, $document) {
		var doc = $document[0].body;
		var loadedScripts = {};

		this.loadScript = function (url, name) {
			var elem = angular.element("<script>")[0];
			elem.src = url;

			return Loader(elem, name);
		};

		this.loadStyle = function (url, name) {
			var elem = angular.element("<link>")[0];
			elem.href = url;

			return Loader(elem, name);
		};

		function Loader (element, name) {
			//jesli podana zostala nazwa skryptu
			if (angular.isString(name)) {
				//jesli skrypt o takiej nazwie byl juz zaladowany, to go teraz usuwam z DOM
				if (loadedScripts[name]) {
					loadedScripts[name].remove();
				}
				//ustawiam ze pod podana nazwa bedzie teraz nowy skrypt
				loadedScripts[name] = element;
			}

			var defer = $q.defer();
			element.onload = function () {
				Logger.debug("Successfully loaded element", element);
				defer.resolve();
			};
			element.onerror = function (error) {
				Logger.error("Failed to load element" , element);
				Logger.error(error);
				defer.reject(error);
			};

			doc.appendChild(element);

			return defer.promise;
		}
	}

})();