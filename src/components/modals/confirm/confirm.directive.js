(function() {
	"use strict";

	angular.module("TrytonApp.Modal")
		.directive("confirm", ConfirmDirective);

	function ConfirmDirective(Modal) {
		return {
			restrict: "A",
			priority: -100,
			scope: {
				"confirm": "&",
				"confirmTitle": "@",
				"confirmDesc": "@"
			},
			link: function (scope, elem, attrs) {
				elem.on("click", function (event) {
					event.stopImmediatePropagation();
					var params = {
						title: scope.confirmTitle,
						description: scope.confirmDesc
					}
					Modal.show.confirm(params)
						.then(function () {
							console.log(scope.confirm());
						})
				})
			}
		}
	}
})();