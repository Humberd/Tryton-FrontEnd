(function () {
	"use strict";

	angular.module("TrytonApp.Configs")
		.constant("ViewUrl", "html/")
		.constant("GamesIconsUrl", "resources/gamesIcons/")
		.constant("RawApiUrl", "http://localhost:8080/")

		.constant("RecaptchaUrl", "https://www.google.com/recaptcha/api.js?onload=vcRecaptchaApiLoaded&render=explicit?hl")
		.constant('RecaptchaKey', "6LeeVyITAAAAAOE0WyhwnMVRU2_q5UyR7kaqqsfe")

		.constant("DefaultSelectedGame", "lol")
		.constant("SelectedGameStorageKey", "selectedGame")
		.constant("UserTokenStorageKey", "userTokenModel");

})();
