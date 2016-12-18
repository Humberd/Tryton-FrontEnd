import {Api} from "../../../../../services/api/Api";
import {LolGameAccount} from "../../models/LolGameAccount";

abstract class BindedMethods {
	protected getLolAccount(): LolGameAccount {
		return;
	}
	protected disconnectLolAccountLocal(): void {

	}
}

export class ConnectedLolController extends BindedMethods {
	constructor(private Api: Api) {

	}

	public disconnectLolAccountApi(): void {
		this.Api.lol.disconnectAccount()
			.then(response => {
				this.disconnectLolAccountLocal();
			})
	}

}

