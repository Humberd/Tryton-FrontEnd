import {LolGameProfile} from "../../../../../../models/user/LolGameProfile";

export interface VerifyLolTaskResponseModel {
	profile: LolGameProfile;
	tasks: Array<AnalyzedTask>;

	noTasksToValidate: boolean;
	noGamesToValidate: boolean;
	apiLimitExceeded: boolean;
}

export interface AnalyzedTask {
	analyzedGames: number;
	task: any;
}
