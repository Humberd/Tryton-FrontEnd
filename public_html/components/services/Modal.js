var app = angular.module("TrytonApp");
app.service("Modal", function ($uibModal, ViewUrl, Logger) {
    return function ModalFunction(htmlFile, controller, modalSizeClass, resolvers) {
        if (!angular.isString(htmlFile)) {
            Logger.warning("[%o] must be a 'htmlFile' string value, but instead is [%s]", htmlFile, typeof (htmlFile));
            return;
        } else if (!angular.isString(controller)) {
            Logger.warning("[%o] must be a 'controller' string value, but instead is [%s]", controller, typeof (controller));
            return;
        } else if (angular.isDefined(modalSizeClass) && !angular.isString(modalSizeClass)) {
            Logger.warning("[%o] must be a 'modalSizeClass' string value, but instead is [%s]", controller, typeof (modalSizeClass));
            return;
        } else if (angular.isDefined(resolvers) && !angular.isObject(resolvers)) {
            Logger.warning("[%o] must be a 'resolvers' object type, but instead is [%s]", resolvers, typeof (resolvers));
            return;
        }
        return $uibModal.open({
            animation: true, //animacja
            backdrop: "static", //tło - (true,false,"static")
            controller: controller,
            keyboard: true, //czy wylaczyc modal klawiszem ESC
            resolve: resolvers, //obiekt zmiennych przekazywanych do controllera,
            templateUrl: ViewUrl + "modal/" + htmlFile,
            size: modalSizeClass
        });
    };
});