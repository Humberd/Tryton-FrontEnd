angular.module("TrytonApp.Router")
    .run(PermissionsRun);

function PermissionsRun(PermissionStore, RoleStore) {
    PermissionStore.definePermission("seeDashboard", function() {
        return true;
    });

}
