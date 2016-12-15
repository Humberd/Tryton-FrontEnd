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

				Logger.info("Successfully logged in [%s]", credentials);
			},
			register: (credentials: JwtResponseModel) => {
				Logger.info("Successfully registered [%s]", credentials);
				returnObject.login(credentials);
			},
			logout: () => {
				Session.setUser();
				Storage.setUserTokenModel(Session.getUser());

				Logger.info("Successfully logged out");
			}
		};

		return returnObject;
	}
})();
