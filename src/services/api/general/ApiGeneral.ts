import {AbstractApi} from "../AbstractApi";
import {RegisterUserRequestModel} from "../../../components/register/RegisterUserRequestModel";
import IPromise = angular.IPromise;

export class ApiGeneral extends AbstractApi {
	public postRegister(model: RegisterUserRequestModel): IPromise<any> {
		return this.post("register/", model)
			.then(response => response.data);
	}
}