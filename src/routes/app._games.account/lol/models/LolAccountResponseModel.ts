import {LolGameAccount} from "./LolGameAccount";

export interface LolAccountResponseModel {
	lolAccount: LolGameAccount;
	masteryPageName?: string;
}