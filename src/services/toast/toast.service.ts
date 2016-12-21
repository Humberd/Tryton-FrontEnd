import IPromise = angular.IPromise;
(function () {
	"use strict";

	angular.module("TrytonApp.Toast")
		.factory("Toast", Toast);

	function Toast($mdToast, ViewUrl, $translate) {
		return {
			success(text: string, delay?: number): IPromise<any> {
				return showToast(text, delay, "toast-green");
			},
			error(text: string, delay?: number): IPromise<any> {
				return showToast(text, delay, "toast-red");
			}
		};

		function showToast(text: string, delay: number = 5000, palette: string): IPromise<any> {
			return $mdToast.show($mdToast.simple()
				.action($translate.instant("TOAST.CLOSE"))
				.hideDelay(delay)
				.textContent(text)
				.position('top center')
				.toastClass(palette));
		}
	}
})();