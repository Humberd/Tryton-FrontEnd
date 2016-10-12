import {AbstractApi} from "../AbstractApi";
import IPromise = angular.IPromise;
import {RegisterModel} from "../../../components/register/RegisterModel";

export class ApiGeneral extends AbstractApi {
	public postRegister(model: RegisterModel): IPromise<any> {
		return this.post("register/")
			.then(response => response.data);
	}
}