(function() {
    "use strict";

    angular.module("TrytonApp.Confirm")
        .directive("confirm", ConfirmDirective);

	/**
	 * <button ng-click="foo()" confirm confirm-title="Are you sure"
	 * confirm-desc="This will delete it permanently">Delete</button>
	 * @param confirm
	 * * @param {string} confirm-title
	 * * @param {string} confrim-desc
	 */
    function ConfirmDirective(Modal, $parse, Logger) {
        return {
            restrict: "A",
            priority: -100,
            scope: true,
            link: function(scope, elem, attrs) {
                elem.on("click", function(event) {
                    stopInvoke(event);
                    try {
                        var params = {
                            title: attrs.confirmTitle,
                            description: attrs.confirmDesc
                        };
                        Modal.confirm(params)
                            .then(function() {
                            	resumeInvoke()
                            })
                    } catch (err) {
                    	Logger.error(err);
                    }
                });

                function stopInvoke(event) {
                    event.stopImmediatePropagation();
                }

                function resumeInvoke() {
                    return $parse(attrs.ngClick)(scope);
                }
            }
        }
    }
})();
