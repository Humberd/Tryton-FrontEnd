import {LolGameTaskRestrictType} from "../../../../../../models/constants/LolGameTaskRestrictType";
export class RestrictOptions {
	readonly values: Array<RestrictOptionsValue> = [
		{
			text: "In a Single Game",
			value: LolGameTaskRestrictType.ONE_MATCH
		},
		{
			text: "In a Row Games",
			value: LolGameTaskRestrictType.ROW_MATCHES
		},
		{
			text: "No Restrictions",
			value: LolGameTaskRestrictType.DOESNT_MATTER
		}
	]
}

export interface RestrictOptionsValue {
	text: string;
	value: LolGameTaskRestrictType;
}