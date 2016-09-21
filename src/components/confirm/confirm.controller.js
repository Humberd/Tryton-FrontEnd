(function() {
	"use strict";

	angular.module("TrytonApp.Confirm")
		.controller("confirmController", ConfirmController);

	function ConfirmController($scope, $mdDialog) {
		var self = this;
		var defaults = {
			title: "Are you sure to proceed this action?",
			description: "",
			ok: "ok",
			cancel: "cancel"
		};

		(function init() {
			var fields = Object.getOwnPropertyNames(defaults);

			for (var f in fields) {
				tryUserValues(fields[f]);
			}

			function tryUserValues(name) {
				$scope[name] = self.locals[name] || defaults[name];
			}
		})();

		$scope.okClick = function () {
			$mdDialog.hide();
		};
		$scope.cancelClick = function () {
			$mdDialog.cancel();
		}
	}
})();