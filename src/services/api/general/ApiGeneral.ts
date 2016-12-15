import {AbstractApi} from "../AbstractApi";
import {RegisterUserRequestModel} from "../../../components/register/models/RegisterUserRequestModel";
import IPromise = angular.IPromise;
import {LoginUserRequestModel} from "../../../components/login/models/LoginUserRequestModel";

export class ApiGeneral extends AbstractApi {
	public postRegister(model: RegisterUserRequestModel): IPromise<any> {
		return this.post("register/", model)
			.then(response => response.data);
	}

	public postLogin(model: LoginUserRequestModel): IPromise<any> {
		return this.post("login/", model)
			.then(response => response.data);
	}
}