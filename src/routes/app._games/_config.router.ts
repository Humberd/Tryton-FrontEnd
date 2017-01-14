import {Api} from "../../services/api/Api";
(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games")
		.config(AppGamesConfig);

	function AppGamesConfig($stateProvider) {
		$stateProvider.state("app._games", {
			abstract: true,
			template: "<div ui-view></div>",
			data: {
				permissions: {
					only: "USER",
					redirectTo: "app.home"
				}
			},
			resolve: {
				profile: function (Api: Api,
							   Session,
							   Logger,
							   SelectedGame) {
					switch (SelectedGame.get()) {
						case "lol":
							return Api.lol.getLolProfile()
								.then(function (response) {
									Session.setProfile("lol", response);
									Logger.info("Downloaded [lol] profile");
								})
								.catch(function (err) {
									Logger.error("Unable to download [lol] profile");
									throw err;
								});
						case "dota2":
							return Api.dota2.getDota2Profile()
								.then(function (response) {
									Session.setProfile("dota2", response);
									Logger.info("Downloaded [dota2] profile");
								})
								.catch(function (err) {
									Logger.error("Unable to download [dota2] profile");
									throw err;
								});
						default:
							Logger.warning("Getting profile from %s is not supported yet.", SelectedGame.get());
							return true;
					}
				}
			}
		});
	}
})();
