import {JwtModel} from "./models/JwtModel";
import {UserProfileModel} from "./models/UserProfileModel";

(function () {
	"use strict";

	angular.module("TrytonApp.Session", [])
		.factory("Session", Session)
		.run(SessionRun);

	function Session() {
		let user: JwtModel;
		let userProfile: UserProfileModel;
		return {
			setUser(newUser: JwtModel): void {
				user = newUser;
			},
			getUser(): JwtModel {
				return user;
			},
			getUsername(): string | null {
				return user ? user.username : null;
			},

			setUserProfile(newUserProfile: UserProfileModel): void {
				userProfile = newUserProfile;
			},
			getUserProfile(): UserProfileModel {
				return userProfile;
			},

			//TODO handle this event
			getUserExp: function () {
				return 170;
			},
			isLoggedIn: function () {
				return !!user;
			},

			clearSession(): void {
				user = null;
				userProfile = null;
			}
		};
	}

	function SessionRun($rootScope, Session, Storage) {
		$rootScope.Session = Session;

		//on startup try to get user token from storage
		Session.setUser(Storage.getUserTokenModel());
	}
})();
