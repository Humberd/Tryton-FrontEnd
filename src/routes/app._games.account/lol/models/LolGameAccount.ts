import {Region} from "../../../../models/constants/Region";

export interface LolGameAccount {
	createdDate: Date;
	verified: boolean;
	details: Details;
}

export interface Details {
	summonerId: number;
	summonerName: string;
	region: string;
}