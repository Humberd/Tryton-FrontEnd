export interface Dota2GameAccount {
	createdDate: number;
	verified: boolean;
	details: Details;
}

export interface Details {
	userId: number;
	userIdShort: number;
	username: string;
}