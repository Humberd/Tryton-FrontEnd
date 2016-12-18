export class Regions {
	values = {
		BR: new Region("BR"),
		EUNE: new Region("EUNE"),
		EUW: new Region("EUW"),
		JP: new Region("JP"),
		KR: new Region("KR"),
		LAS: new Region("LAS"),
		LAN: new Region("LAN"),
		NA: new Region("NA"),
		OCE: new Region("OCE"),
		PBE: new Region("PBE", true),
		RU: new Region("RU"),
		TR: new Region("TR"),
		GLOBAL: new Region("GLOBAL", true),
	};

	public toShortList(): Array<string> {
		return Object.keys(this.values)
			.filter((key) => !this.values[key].isDisabled)
			.map((key) => this.values[key].value);
	}

	public toList(): Object {
		let returnObject = {};
		Object.keys(this.values)
			.filter((key) => !this.values[key].isDisabled)
			.forEach((key) => returnObject[key] = this.values[key].value);

		return returnObject;

	}
}

export class Region {
	value: string;
	isDisabled: boolean;

	constructor(value: string, isDisabled?: boolean = false) {
		this.value = value;
		this.isDisabled = isDisabled;
	}

	public disable(): void {
		this.isDisabled = false;
	}

	public setDisabled(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}