import {LolGameTaskTimeoutType} from "../../../../../../models/constants/LolGameTaskTimeoutType";
export class TimeoutOptions {
	readonly values: Array<TimeoutOptionsValue> = [
		{
			text: "Hours",
			value: LolGameTaskTimeoutType.HOUR,
			min: 1,
			max: 100
		},
		{
			text: "Won Games",
			value: LolGameTaskTimeoutType.WON_MATCH,
			min: 1,
			max: 30
		}
	]
}

export interface TimeoutOptionsValue {
	text: string;
	value: LolGameTaskTimeoutType;
	min: number;
	max: number;
}