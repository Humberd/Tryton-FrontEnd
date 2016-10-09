import IPromise = angular.IPromise;
import IHttpPromise = angular.IHttpPromise;
export abstract class AbstractApi {
	protected $http: any;
	protected RawApiUrl: any;

	public inject($http, RawApiUrl): AbstractApi {
		this.$http = $http;
		this.RawApiUrl = RawApiUrl;
		return this;
	}

	protected get(url: string): IHttpPromise {
		return this.$http({
			method: "GET",
			url: this.RawApiUrl + url
		});
	}
}