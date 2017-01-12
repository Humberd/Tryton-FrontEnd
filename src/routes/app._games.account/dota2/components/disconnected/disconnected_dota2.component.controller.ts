import {Dota2AccountResponseModel} from "../../models/Dota2AccountResponseModel";
import IWindowService = angular.IWindowService;
import {SteamOpenIDConfig} from "../../../../../configs/steam-openid/SteamOpenIDConfig";

export class Dota2DisconnectedComponent {
	readonly methods: {
		connectDota2AccountLocal: (accountModel: Dota2AccountResponseModel) => void;
		getAccountModel: () => Dota2AccountResponseModel;
	};

	constructor(private SteamOpenIDConfig: SteamOpenIDConfig,
				private $window: IWindowService,) {

	}

	public openSteamLoginPage() {
		let url = this.SteamOpenIDConfig.generateValidLoginUrl();
		this.$window.location.replace(url);
	}
}