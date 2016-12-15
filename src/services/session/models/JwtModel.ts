import {Role} from "./Role";

export class JwtModel {
	_id: string;
	username: string;
	expirationDate: Date;
	role: Role;
	rawToken: string;

	public static decodeRawToken = (rawToken: string): JwtModel => {
		let dataStringEncoded = rawToken.split(".")[1];
		let dataStringDecoded = atob(dataStringEncoded);
		let dataObject = JSON.parse(dataStringDecoded);

		let jwtModel = new JwtModel();
		jwtModel._id = dataObject.jti;
		jwtModel.username = dataObject.sub;
		jwtModel.role = Role[dataObject.role];
		jwtModel.expirationDate = new Date(dataObject.exp * 1000);
		jwtModel.rawToken = rawToken;

		return jwtModel;
	};
}