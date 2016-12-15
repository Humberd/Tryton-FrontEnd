import {JwtModel} from "./models/JwtModel";

(function () {
	"use strict";

	angular.module("TrytonApp.Session", [])
		.factory("Session", Session)
		.run(SessionRun);

	function Session() {
		let user: JwtModel;
		return {
			setUser: (newUser: JwtModel): void => {
				user = newUser;
			},
			getUser: (): JwtModel => {
				return user;
			},
			getUsername: (): string | null => {
				return user ? user.username : null;
			},

			//TODO handle this event
			getUserExp: function () {
				return 170;
			},
			isLoggedIn: function () {
				return !!user;
			}
		};
	}

	function SessionRun($rootScope, Session, Storage) {
		$rootScope.Session = Session;

		//on startup try to get user token from storage
		Session.setUser(Storage.getUserTokenModel());
	}
})();
