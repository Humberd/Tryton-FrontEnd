import {LolGameAccount} from "../../../../models/user/LolGameAccount";

export interface LolAccountResponseModel {
	lolAccount: LolGameAccount;
	masteryPageName?: string;
}