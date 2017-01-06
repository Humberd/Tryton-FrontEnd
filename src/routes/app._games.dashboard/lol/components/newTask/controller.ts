import {TaskLolDB} from "../../models/TaskLolDB";
import {TimesOptions} from "./models/TimesOptions";
import {TimeoutOptions} from "./models/TimeoutOptions";
import {LolGameTaskTimeoutType} from "../../../../../models/constants/LolGameTaskTimeoutType";
import {SubmitLolTaskRequestModel} from "./models/SubmitLolTaskRequestModel";
import {Api} from "../../../../../services/api/Api";
import IScope = angular.IScope;

class NewTaskController {
	readonly loaderName: string = "newLolTaskFormLoader";

	templateTask: TaskLolDB;//tutaj modal sam binduje wartosc w te pole
	timesOptions: TimesOptions = new TimesOptions();
	timeoutOptions: TimeoutOptions = new TimeoutOptions();

	selectedTimeoutType: LolGameTaskTimeoutType = LolGameTaskTimeoutType.HOUR;
	selectedTimeoutValue: number = 1;
	selectedTimesValue: number = 1;

	constructor(private $scope: IScope,
				private $mdDialog,
				private Api: Api) {
	}

	public submitTask(): void {
		let requestModel: SubmitLolTaskRequestModel = {
			templateId: this.templateTask._id,
			settings: {
				times: this.selectedTimesValue,
				timeout: {
					type: this.selectedTimeoutType,
					value: this.selectedTimeoutValue
				}
			}
		};

		console.log(requestModel);


		// this.Api.lol.submitTask(requestModel)
		// 	.then((result) => {
		// 		console.log(result);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	})
	}

	public close(): void {
		this.$mdDialog.cancel();
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard.newTask")
		.controller("newTaskController", NewTaskController);

})();
