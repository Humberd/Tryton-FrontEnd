import {Controller} from "../../utils/decorators/Controller";

@Controller({
	module: "TrytonApp.Router.App.Home",
	name: "AppHomeController"
})
class AppHomeController {
	flag = true;
	constructor(private $scope,
				private Loader,
				private $interval,
				private Modal,
				private Session,
				private $state) {
	}

	public register(): void {
		if (!this.Session.isLoggedIn()) {
			this.goRegister();
		} else {
			this.goDashboard();
		}
	}

	public dashboard(): void {
		if (this.Session.isLoggedIn()) {
			this.goDashboard();
		} else {
			this.goLogin();
		}
	}

	public faq(): void {
		console.log("HELLO");
		this.goFaq();
	}

	private goDashboard(): void {
		this.$state.go("app._games.dashboard");
	}

	private goRegister(): void {
		this.Modal.register();
	}

	private goLogin(): void {
		this.Modal.login();
	}

	private goFaq(): void {
		this.$state.go("app.faq");
	}
}