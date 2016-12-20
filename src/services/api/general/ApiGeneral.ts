import {AbstractApi} from "../AbstractApi";
import {RegisterUserRequestModel} from "../../../components/register/models/RegisterUserRequestModel";
import IPromise = angular.IPromise;
import {LoginUserRequestModel} from "../../../components/login/models/LoginUserRequestModel";
import {JwtResponseModel} from "../../../components/login/models/JwtResponseModel";
import {ResponseMessage} from "../../../models/ResponseMessage";
import {ChangePasswordRequestModel} from "../../../routes/app.account.password/models/ChangePasswordRequestModel";

export class ApiGeneral extends AbstractApi {
	public register(model: RegisterUserRequestModel): IPromise<JwtResponseModel> {
		return this.post("register/", model)
			.then(response => response.data);
	}

	public login(model: LoginUserRequestModel): IPromise<JwtResponseModel> {
		return this.post("login/", model)
			.then(response => response.data);
	}

	public changePassword(model: ChangePasswordRequestModel): IPromise<ResponseMessage>{
		return this.post("password/change/", model)
			.then(response => response.data);
	}
}