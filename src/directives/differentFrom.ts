(function () {
	"use strict";

	angular.module("TrytonApp.Directives")
		.directive("differentFrom", CompareToDirective);

	/*
	 	<input different-from="{{ctrl.model.oldPassword}}"/>
	 */
	function CompareToDirective($parse) {
		return {
			require: "ngModel",
			restrict: "A",
			scope: true,
			link(scope, elem, attrs, ngModel){
				let otherValue;
				ngModel.$validators.differentFrom = (modelValue) => {
					return modelValue !== otherValue;
				};
				attrs.$observe("differentFrom", (newOtherValue) => {
					otherValue = newOtherValue;
					ngModel.$validate();
				});
			}
		}
	}
})();