var app = angular.module("TrytonApp");
app.service("Modal", function ($uibModal, ViewUrl, Logger) {
    return function ModalFunction(htmlFile, controller, resolvers) {
        if (!angular.isString(htmlFile)) {
            Logger.warning("[%o] must be a 'htmlFile' string value, but instead is [%s]", htmlFile, typeof (htmlFile));
            return;
        } else if (!angular.isString(controller)) {
            Logger.warning("[%o] must be a 'controller' string value, but instead is [%s]", controller, typeof (controller));
            return;
        } else if (angular.isDefined(resolvers) && !angular.isObject()) {
            Logger.warning("[%o] must be a 'resolvers' object type, but instead is [%s]", resolvers, typeof (resolvers));
            return;
        }
        return $uibModal.open({
            animation: true, //animacja
            backdrop: true, //tło - (true,false,"static")
            controller: controller,
            keyboard: true, //czy wylaczyc modal klawiszem ESC
            resolve: resolvers, //obiekt zmiennych przekazywanych do controllera,
            templateUrl: ViewUrl + "modal/" + htmlFile,
            windowTopClass: "bvcbcvbdfbdbd"
        });
    };
});