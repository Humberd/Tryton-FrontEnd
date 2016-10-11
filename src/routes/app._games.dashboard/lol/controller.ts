import {TaskLolDB, Currency} from "./definitions/TaskLolDB";
import IScope = angular.IScope;
import ITimeoutService = angular.ITimeoutService;
(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("LolController", LolController);

	function LolController($scope, Modal, Api, Loader, $timeout: ITimeoutService) {
		let templateTasksList: TaskLolDB[];
		$scope.templateTasksList = templateTasksList;

		//////////////////////////////////////
		//------------DOWNLOADS-------------//
		//////////////////////////////////////

		$scope.downloadTemplateTasksList = () => {
			let loaderName = "lolDashboardTemplateTasksList";
			$scope.templateTasksList = null;
			Loader.startLoadingEventually(loaderName);

			Api.lol.getAllTasks()
				.then(templateTasksList => {
					$scope.templateTasksList = templateTasksList;
					Loader.stopLoading(loaderName);
				})
		};

		//////////////////////////////////////
		//----------VIEW METHODS------------//
		//////////////////////////////////////

		$scope.addNewTask = (templateTask) => {
			Modal.newTask({templateTask});
		};

		// $scope.tasksList = [];
		// $scope.tasksList.push({
		// 	_id: "cvx3r23r",
		// 	name: "Penta kill",
		// 	description: "Kill 5 people in a short amount of time",
		// 	difficulty: 4,
		// 	baseExp: 60,
		// 	requirements: {
		// 		level: {
		// 			min: 5,
		// 			max: 19
		// 		}
		// 	},
		// 	image: "http://kingofwallpapers.com/river/river-008.jpg"
		// });
		// $scope.tasksList.push({
		// 	_id: "32nklngxkfnld",
		// 	name: "200 minions",
		// 	description: "Slay 200 minions",
		// 	difficulty: 2,
		// 	baseExp: 22,
		// 	requirements: {
		// 		level: {
		// 			min: -1,
		// 			max: -1
		// 		}
		// 	},
		// 	image: "http://kingofwallpapers.com/river/river-008.jpg"
		// });
		(function () {
			$scope.downloadTemplateTasksList();
		})();
	}
})();