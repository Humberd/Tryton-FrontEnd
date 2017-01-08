import {LolGameAccount} from "../../../models/user/LolGameAccount";
import {LolGameProfile} from "../../../models/user/LolGameProfile";

export class LolProfileModel {
	profile: LolGameProfile;
	account: LolGameAccount;
	isBanned: boolean;
}