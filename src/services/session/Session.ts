import {JwtModel} from "./models/JwtModel";
import {LolProfileModel} from "./models/LolProfileModel";

(function () {
	"use strict";

	angular.module("TrytonApp.Session", [])
		.factory("Session", Session)
		.run(SessionRun);

	function Session() {
		let user: JwtModel;
		let profile: {
			lol: LolProfileModel,
			csgo: any
		} = {};
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

			setProfile(game: string, newProfile: LolProfileModel): void {
				profile[game] = newProfile;
			},
			getLolProfile(): LolProfileModel {
				return profile.lol;
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
				profile = {};
			}
		};
	}

	function SessionRun($rootScope, Session, Storage) {
		$rootScope.Session = Session;

		//on startup try to get user token from storage
		Session.setUser(Storage.getUserTokenModel());
	}
})();
