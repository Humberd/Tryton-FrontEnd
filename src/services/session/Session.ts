import {JwtModel} from "./models/JwtModel";
import {LolProfileModel} from "./models/LolProfileModel";
import {Dota2ProfileModel} from "./models/Dota2ProfileModel";

(function () {
	"use strict";

	angular.module("TrytonApp.Session", [])
		.factory("Session", Session)
		.run(SessionRun);

	function Session() {
		let user: JwtModel;
		let profile: {
			lol: LolProfileModel,
			dota2: Dota2ProfileModel
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
			getProfile(game: string): any {
				return profile[game];
			},
			getLolProfile(): LolProfileModel {
				return profile.lol;
			},
			getDota2Profile(): Dota2ProfileModel {
				return profile.dota2;
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
