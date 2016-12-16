export interface TaskLolDB {
	_id: string;
	name: string;
	difficulty: number;
	base: Currency;
	requiredLevel: number;
	options: TaskLolDBOptions;
}

export interface Currency {
	exp: number;
}

export interface TaskLolDBOptions {
	multipleInOneMatch: boolean;
	mustBeWon: boolean;
}