export class Regions {
	values = {
		BR: new Region("br"),
		EUNE: new Region("eune"),
		EUW: new Region("euw"),
		JP: new Region("jp"),
		KR: new Region("kr"),
		LAS: new Region("las"),
		LAN: new Region("lan"),
		NA: new Region("na"),
		OCE: new Region("oce"),
		PBE: new Region("pbe", true),
		RU: new Region("ru"),
		TR: new Region("tr"),
		GLOBAL: new Region("global", true),
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