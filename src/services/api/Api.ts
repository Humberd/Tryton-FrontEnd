import {ApiLol} from "./lol/ApiLol";
import {ApiGeneral} from "./general/ApiGeneral";
import {ApiDota2} from "./dota2/ApiDota2";
(function () {
	"use strict";

	angular.module("TrytonApp.Api")
		.factory("Api", ApiFactory);

	function ApiFactory($http, RawApiUrl) {
		return {
			general: new ApiGeneral().inject($http, RawApiUrl),
			lol: new ApiLol().inject($http, RawApiUrl),
			dota2: new ApiDota2().inject($http, RawApiUrl)
		}
	}
})();

export interface Api {
	general: ApiGeneral;
	lol: ApiLol;
	dota2: ApiDota2;
}