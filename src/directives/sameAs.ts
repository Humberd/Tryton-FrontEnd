(function () {
	"use strict";

	angular.module("TrytonApp.Directives")
		.directive("sameAs", CompareToDirective);

	/*
		<input same-as="{{ctrl.model.repeatPassword}}"/>
	 */
	function CompareToDirective($parse) {
		return {
			require: "ngModel",
			restrict: "A",
			scope: true,
			link(scope, elem, attrs, ngModel){
				let otherValue;
				ngModel.$validators.sameAs = (modelValue) => {
					return modelValue === otherValue;
				};
				attrs.$observe("sameAs", (newOtherValue) => {
					otherValue = newOtherValue;
					ngModel.$validate();
				});
			}
		}
	}
})();