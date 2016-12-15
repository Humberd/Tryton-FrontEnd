import {ApiLol} from "./lol/ApiLol";
import {ApiGeneral} from "./general/ApiGeneral";
(function () {
	"use strict";

	angular.module("TrytonApp.Api")
		.factory("Api", ApiFactory);

	function ApiFactory($http, RawApiUrl) {
		return {
			general: new ApiGeneral().inject($http, RawApiUrl),
			lol: new ApiLol().inject($http, RawApiUrl)
		}
	}
})();

export interface Api {
	general: ApiGeneral;
	lol: ApiLol
}