import {JwtResponseModel} from "../components/login/models/JwtResponseModel";
import {JwtModel} from "./session/models/JwtModel";
(function () {
	"use strict";

	angular.module("TrytonApp.Authentication", ["vcRecaptcha"])
		.factory("Auth", Auth);

	function Auth(Session, Logger, Storage) {
		let returnObject = {
			login: (credentials: JwtResponseModel) => {
				Session.setUser(JwtModel.decodeRawToken(credentials.token));
				Storage.setUserTokenModel(Session.getUser());

				Logger.info("Successfully logged in [%s]", Session.getUsername());
			},
			register: (credentials: JwtResponseModel) => {
				Logger.info("Successfully registered [%s]", Session.getUsername());
				returnObject.login(credentials);
			},
			logout: () => {
				Session.clearSession();
				Storage.setUserTokenModel(Session.getUser());

				Logger.info("Successfully logged out");
			}
		};

		return returnObject;
	}
})();
