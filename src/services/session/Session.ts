import {JwtModel} from "./models/JwtModel";
import {LolProfileModel} from "./models/LolProfileModel";

(function () {
	"use strict";

	angular.module("TrytonApp.Session", [])
		.factory("Session", Session)
		.run(SessionRun);

	function Session() {
		let user: JwtModel;
		let lolProfile: LolProfileModel;
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

			setLolProfile(newLolProfile: LolProfileModel): void {
				lolProfile = newLolProfile;
			},
			getLolProfile(): LolProfileModel {
				return lolProfile;
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
			}
		};
	}

	function SessionRun($rootScope, Session, Storage) {
		$rootScope.Session = Session;

		//on startup try to get user token from storage
		Session.setUser(Storage.getUserTokenModel());
	}
})();
