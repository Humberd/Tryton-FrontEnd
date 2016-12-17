import {TaskLolDB} from "./models/TaskLolDB";
import IScope = angular.IScope;
import ITimeoutService = angular.ITimeoutService;
import {Api} from "../../../services/api/Api";
import {Controller} from "../../../utils/decorators/Controller";

@Controller({
	module: "TrytonApp.Router.App._games.Dashboard",
	name: "LolController"
})
class LolController {
	private taskListLoaderName = "lolDashboardTemplateTasksList";
	templateTasksList: Array<TaskLolDB>;

	constructor(private $scope: IScope,
				private Modal,
				private Api: Api,
				private Loader,
				private $timeout: ITimeoutService) {
		this.downloadTemplateTasksList();
	}

	private downloadTemplateTasksList() {
		this.templateTasksList = null;
		this.Loader.startLoadingEventually(this.taskListLoaderName);

		this.Api.lol.getAllTasks()
			.then((result) => {
				this.templateTasksList = result;
				console.log(this.templateTasksList);
			})
			.finally(() => {
				this.Loader.stopLoading(this.taskListLoaderName);
			})
	}

	public addNewTask(templateTask: TaskLolDB) {
		this.Modal.newTask({templateTask})
	}
}