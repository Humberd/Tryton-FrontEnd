(function () {
	"use strict";

	angular.module("TrytonApp.Modal", [])
		.provider("Modal", Modal);

	/**
	 * -- Config --
	 * ModalProvider.registerModal("newTask.html", "newTaskController");
	 *
	 * -- Wherever --
	 * Modal.newTask();
	 */
	function Modal() {
		var $get = {};
		var deps = {};

		this.$get = function (ViewUrl, Logger, $mdDialog) {
			deps.ViewUrl = ViewUrl;
			deps.Logger = Logger;
			deps.$mdDialog = $mdDialog;
			return $get;
		};

		this.registerModal = function (htmlFile, controller) {
			try {
				var fileWithoutExtension = htmlFile.split(".")[0];
			} catch (err) {
				throw "File: " + htmlFile + " is in bad format";
			}
			setMethod(fileWithoutExtension, htmlFile, controller);
		};

		function setMethod(key, htmlFile, controller) {
			if ($get[key]) {
				throw "Modal: " + htmlFile + " already exists";
			}
			$get[key] = function (resolvers) {
				return ModalFunction(htmlFile, controller, resolvers);
			}
		}

		function ModalFunction(htmlFile, controller, resolvers) {
			if (!angular.isString(htmlFile)) {
				deps.Logger.warning("[%o] must be a 'htmlFile' string value, but instead is [%s]", htmlFile, typeof(htmlFile));
				return;
			} else if (!angular.isString(controller)) {
				deps.Logger.warning("[%o] must be a 'controller' string value, but instead is [%s]", controller, typeof(controller));
				return;
			} else if (angular.isDefined(resolvers) && !angular.isObject(resolvers)) {
				deps.Logger.warning("[%o] must be a 'resolvers' object type, but instead is [%s]", resolvers, typeof(resolvers));
				return;
			}
			return deps.$mdDialog.show({
				templateUrl: deps.ViewUrl + htmlFile,
				clickOutsideToClose: true,
				escapeToClose: true,
				controller: controller,
				locals: resolvers,
				bindToController: true
			});
		}
	}

	//     .service("Modal", Modal);

	// function Modal($uibModal, ViewUrl, Logger, $mdDialog) {
	//     this.show = {};
	//     var modals = {
	//         "login.html": "loginController",
	//         "register.html": "registerController",
	//         "newTask.html": "newTaskController",
	//         "confirm.html": "confirmController"
	//     }
	//     parseModalsToShowMethods.call(this);

	//     function ModalFunction(htmlFile, controller, resolvers) {
	//         if (!angular.isString(htmlFile)) {
	//             Logger.warning("[%o] must be a 'htmlFile' string value, but instead is [%s]", htmlFile, typeof(htmlFile));
	//             return;
	//         } else if (!angular.isString(controller)) {
	//             Logger.warning("[%o] must be a 'controller' string value, but instead is [%s]", controller, typeof(controller));
	//             return;
	//         } else if (angular.isDefined(resolvers) && !angular.isObject(resolvers)) {
	//             Logger.warning("[%o] must be a 'resolvers' object type, but instead is [%s]", resolvers, typeof(resolvers));
	//             return;
	//         }
	//         return $mdDialog.show({
	//             templateUrl: ViewUrl + htmlFile,
	//             clickOutsideToClose: true,
	//             escapeToClose: true,
	//             controller: controller,
	//             locals: resolvers,
	//             bindToController: true
	//         });
	//     };

	//     function parseModalsToShowMethods() {
	//         var show = this.show;
	//         for (var m in modals) {
	//             var keyNoExtension = m.split(".")[0];
	//             setMethod(keyNoExtension, m, modals[m]);
	//         }
	//         function setMethod(key, htmlFile, controller) {
	//             show[key] = function (resolvers) {
	//                 return ModalFunction(htmlFile, controller, resolvers);
	//             }
	//         }
	//     }
	// }
})();
