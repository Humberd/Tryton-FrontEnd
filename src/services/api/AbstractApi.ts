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
		return this.acquire$http("GET", url);
	}

	protected post(url: string, data?: any): IHttpPromise {
		return this.acquire$http("POST", url, data);
	}

	protected put(url: string, data?: any): IHttpPromise {
		return this.acquire$http("PUT", url, data);
	}

	protected delete(url: string): IHttpPromise {
		return this.acquire$http("DELETE", url);
	}

	private acquire$http(method: string, url: string, data?: any): IHttpPromise {
		return this.$http({
			method,
			url: this.RawApiUrl + url,
			data
		});
	}
}