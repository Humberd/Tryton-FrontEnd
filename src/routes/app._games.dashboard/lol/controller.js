(function () {
	"use strict";

	angular.module("TrytonApp.Router.App._games.Dashboard")
		.controller("LolController", LolController);

	function LolController($scope, Modal) {
		// Modal.newTask();

		$scope.tasksList = [];
		var tasksList = $scope.tasksList;
		tasksList.push({
			_id: "cvx3r23r",
			name: "Penta kidsads adsdasdll",
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
		tasksList.push({
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
		console.log($scope.tasksList);

	}
})();