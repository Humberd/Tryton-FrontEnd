import {ActiveTask} from "./definitions/ActiveTask";
(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("LolController", LolController);

	function LolController($scope, Modal) {
		// Modal.newTask();
		$scope.hello = new ActiveTask().name;
		$scope.activeTasksList = [];
		$scope.activeTasksList.push({
			_id: "423fxcv1fv",
			name: "Quadra kill",
			description: "Kill 4 people in a short amount of time",
			difficulty: 4,
			baseExp: 50,
			requirements: {
				level: {
					min: 4,
					max: -1
				}
			},
			image: "http://kingofwallpapers.com/river/river-008.jpg",
			settings: {
				times: {
					value: 1
				},
				restrict: {
					value: "single" //single, row, without
				},
				timeout: {
					value: 5,
					type: "hours" //hours, won, played, date
				}
			}
		});

		$scope.tasksList = [];
		$scope.tasksList.push({
			_id: "cvx3r23r",
			name: "Penta kill",
			description: "Kill 5 people in a short amount of time",
			difficulty: 4,
			baseExp: 60,
			requirements: {
				level: {
					min: 5,
					max: 19
				}
			},
			image: "http://kingofwallpapers.com/river/river-008.jpg"
		});
		$scope.tasksList.push({
			_id: "32nklngxkfnld",
			name: "200 minions",
			description: "Slay 200 minions",
			difficulty: 2,
			baseExp: 22,
			requirements: {
				level: {
					min: -1,
					max: -1
				}
			},
			image: "http://kingofwallpapers.com/river/river-008.jpg"
		});
	}
})();