(function () {
	"use strict";

	angular.module("TrytonApp.Router")
		.run(PermissionsRun);

	function PermissionsRun(PermissionStore, RoleStore, Session, Toast, $translate,
							SelectedGame) {
		RoleStore.defineRole("USER", () => {
			let isLoggedIn = Session.isLoggedIn();
			if (!isLoggedIn) {
				Toast.error($translate.instant("PERMISSIONS.UNAUTHORIZED"));
			}
			return isLoggedIn;
		});
		RoleStore.defineRole("VERIFIED-ACCOUNT", () => {
			let userProfile = Session.getProfile(SelectedGame.get());
			if (userProfile && userProfile.account) {
				return userProfile.account.verified;
			}
			return false;
		})
	}
})();
