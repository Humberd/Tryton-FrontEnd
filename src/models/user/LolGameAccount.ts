export interface LolGameAccount {
	createdDate: number;
	verified: boolean;
	details: Details;
}

export interface Details {
	summonerId: number;
	summonerName: string;
	region: string;
}