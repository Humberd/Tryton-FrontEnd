(function() {
    "use strict";

    angular.module("TrytonApp.Router")
        .run(PermissionsRun);

    function PermissionsRun(PermissionStore, RoleStore, Session, Toast, $translate) {
        RoleStore.defineRole("USER", function () {
            let isLoggedIn = Session.isLoggedIn();
            if (!isLoggedIn) {
                Toast.error($translate.instant("PERMISSIONS.UNAUTHORIZED"));
            }
            return isLoggedIn;
        })
    }
})();
