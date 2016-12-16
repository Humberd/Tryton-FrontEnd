import {Controller} from "../../utils/decorators/Controller";

@Controller({
	module: "TrytonApp.Router.App.Home",
	name: "AppHomeController"
})
class AppHomeController {
	dupa = "foo";
	flag = true;
	constructor(private $scope,
				private Loader,
				private $interval) {

	}
}