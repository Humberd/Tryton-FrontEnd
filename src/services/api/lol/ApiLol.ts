import {AbstractApi} from "../AbstractApi";
import {TaskLolDB} from "../../../routes/app._games.dashboard/lol/definitions/TaskLolDB";
import IPromise = angular.IPromise;

export class ApiLol extends AbstractApi{
	public getAllTasks(): IPromise<TaskLolDB[]> {
		return this.get("task/lol/")
			.then(response => response.data);
	}
	public getTaskById(id: number|string): IPromise<TaskLolDB> {
		return this.get(`task/lol/${id}`)
			.then(response => response.data);
	}
}