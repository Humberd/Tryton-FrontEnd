import {Role} from "../../../models/constants/Role";

export class JwtModel {
	tokenId: string;
	userId: string;
	username: string;
	expirationDate: Date;
	role: Role;
	rawToken: string;

	private constructor() {

	}

	public static decodeRawToken = (rawToken: string): JwtModel => {
		let dataStringEncoded = rawToken.split(".")[1];
		let dataStringDecoded = atob(dataStringEncoded);
		let dataObject = JSON.parse(dataStringDecoded);

		return {
			tokenId: dataObject.jti,
			userId: dataObject.subId,
			username: dataObject.sub,
			expirationDate: new Date(dataObject.exp * 1000),
			role: Role[dataObject.role],
			rawToken: rawToken
		};
	};
}