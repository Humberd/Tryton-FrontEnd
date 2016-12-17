import {TaskLolDB} from "../../models/TaskLolDB";
import {TimesOptions} from "./models/TimesOptions";
import {RestrictOptions} from "./models/RestrictOptions";
import {TimeoutOptions} from "./models/TimeoutOptions";
import {LolGameTaskRestrictType} from "../../../../../models/constants/LolGameTaskRestrictType";
import {LolGameTaskTimeoutType} from "../../../../../models/constants/LolGameTaskTimeoutType";
import {SubmitLolTaskRequestModel} from "./models/SubmitLolTaskRequestModel";
import {Api} from "../../../../../services/api/Api";
import IScope = angular.IScope;

class NewTaskController {
	templateTask: TaskLolDB;//tutaj modal sam binduje wartosc w te pole
	timesOptions: TimesOptions = new TimesOptions();
	restrictOptions: RestrictOptions = new RestrictOptions();
	timeoutOptions: TimeoutOptions = new TimeoutOptions();

	selectedRestrictType: LolGameTaskRestrictType;
	selectedTimeoutType: LolGameTaskTimeoutType;
	timesValue: number;

	timeoutValues: {
		[key: string]: number;
	} = {};

	constructor(private $scope: IScope,
				private $mdDialog,
				private Api: Api) {
	}

	public createTask(): void {
		let requestModel: SubmitLolTaskRequestModel = {
			templateId: this.templateTask._id,
			settings: {
				times: this.timesValue,
				restrict: this.selectedRestrictType,
				timeout: {
					type: this.selectedTimeoutType,
					value: this.timeoutValues[this.selectedTimeoutType]
				}
			}
		};


		this.Api.lol.submitTask(requestModel)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			})
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
