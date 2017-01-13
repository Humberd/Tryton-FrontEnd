import {TaskLolDB} from "../../models/TaskLolDB";
import {TimesOptions} from "./models/TimesOptions";
import {TimeoutOptions} from "./models/TimeoutOptions";
import {LolGameTaskTimeoutType} from "../../../../../models/constants/LolGameTaskTimeoutType";
import {SubmitLolTaskRequestModel} from "./models/SubmitLolTaskRequestModel";
import {Api} from "../../../../../services/api/Api";
import IScope = angular.IScope;

class NewTaskController {
	readonly loaderName: string = "newLolTaskFormLoader";
	errorMessage: string;

	templateTask: TaskLolDB;//tutaj modal sam binduje wartosc w te pole
	timesOptions: TimesOptions = new TimesOptions();
	timeoutOptions: TimeoutOptions = new TimeoutOptions();

	selectedTimeoutType: LolGameTaskTimeoutType = LolGameTaskTimeoutType.HOUR;
	selectedTimeoutValue: number = 1;
	selectedTimesValue: number = 1;

	constructor(private $mdDialog,
				private Api: Api,
				private Loader) {
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

		this.Loader.startLoading(this.loaderName);

		this.Api.lol.submitUserTask(requestModel)
			.then((response) => {
				this.hideModal(response);
			})
			.catch((err) => {
				console.error(err);
				this.errorMessage = err.data.message;
			})
			.finally(() => {
				this.Loader.stopLoading(this.loaderName);
			});
	}

	public hideModal(newTask: any): void {
		this.$mdDialog.hide(newTask);
	}

	public closeModal(): void {
		this.$mdDialog.cancel();
	}

	public minMaxTranslationData(min: number, max: number): Object {
		return {
			minValue: min,
			maxValue: max
		}
	}

	public calculateTotalExp(): number {
		let times = this.selectedTimesValue || 1;
		let timeout = this.selectedTimeoutValue || 1;
		let base = this.templateTask.base.exp || 0;

		return (1 + (((2 * times) - 2) / timeout)) * base;
	}
}

(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard.newTask")
		.controller("newTaskController", NewTaskController);

})();
