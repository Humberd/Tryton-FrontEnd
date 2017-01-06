import {LolGameTaskTimeoutType} from "../../../../../../models/constants/LolGameTaskTimeoutType";
export class TimeoutOptions {
	readonly values: Array<TimeoutOptionsValue> = [
		{
			value: LolGameTaskTimeoutType.HOUR,
			min: 1,
			max: 100
		},
		{
			value: LolGameTaskTimeoutType.WON_MATCH,
			min: 1,
			max: 30
		}
	];

	public get(type: LolGameTaskTimeoutType): TimeoutOptionsValue {
		for (let value: TimeoutOptionsValue of this.values) {
			if (value.value === type) {
				return value;
			}
		}
	}
}

export interface TimeoutOptionsValue {
	value: LolGameTaskTimeoutType;
	min: number;
	max: number;
}