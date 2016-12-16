import {AbstractApi} from "../AbstractApi";
import {TaskLolDB} from "../../../routes/app._games.dashboard/lol/models/TaskLolDB";
import IPromise = angular.IPromise;

export class ApiLol extends AbstractApi{
	public getAllTasks(): IPromise<TaskLolDB[]> {
		return this.get("task/lol/list/")
			.then(response => response.data);
	}
	public getTaskById(id: number|string): IPromise<TaskLolDB> {
		return this.get(`task/lol/list/${id}`)
			.then(response => response.data);
	}
}