import {Api} from "../../../services/api/Api";

export class ProfileController {

	constructor(private Api: Api) {
		Api.lol.getLolProfile()
			.then(response => {
				console.log(response);
			})
	}
}

(function () {
    "use strict";

    angular.module("TrytonApp.Router.App._games.Profile")
		.controller("profile_lol.controller", ProfileController);
})();