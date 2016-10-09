import {ApiLol} from "./lol/ApiLol";
(function () {
	"use strict";

	angular.module("TrytonApp.Api")
		.factory("Api", ApiFactory);

	function ApiFactory($http, RawApiUrl) {
		return {
			lol: new ApiLol().inject($http, RawApiUrl)
		}
	}
})();