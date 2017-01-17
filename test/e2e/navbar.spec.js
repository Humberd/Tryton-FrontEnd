describe("Navbar", function () {

	function getElementByUiSref(stateName) {
		return $("[ui-sref='" + stateName + "']");
	}

	// beforeEach(function () {
	browser.get("http://192.168.1.100:8000/");
	// });

	describe("ui-sref ", function () {
		var routes = {
			"app.home": "/",
			"app.faq": "/faq",
			"app._games.dashboard": "//dashboard",
			"app._games.account": "//account",
			"app.account.password": "/account/password"
		};

		Object.keys(routes)
			.forEach(function (key) {
				it("state [" + key + "] should direct to [" + routes[key] + "]", function () {
					var elem = getElementByUiSref(key);
					expect(elem.getAttribute("href")).toEqual(routes[key]);
				});
			});
	});

	describe("bar", function () {
		var tabs = $$("my-nav-bar .my-nav-bar-column-item");
		var tabsExpandable = $$("my-nav-bar .my-nav-bar-column-item.expandable");

		it("should have eight tabs", function () {
			expect(tabs.count()).toEqual(8);
		});

		it("should expand a visible tabs", function () {
			var tabsExpandable = $$("my-nav-bar .my-nav-bar-column-item.expandable");

			tabsExpandable.each(function (tab) {
				tab.isDisplayed()
					.then(function (isVisible) {
						if (!isVisible) {
							return "not visible";
						}

						var pills = tab.$(".my-nav-bar-column-item-content");

						expect(pills.isDisplayed()).toBe(false);

						tab.click();

						expect(pills.isDisplayed()).toBe(true);

						tab.click();

						expect(pills.isDisplayed()).toBe(false);
					});
			});
		});

		it("should change the options in a tab", function () {
			var langTab = $("my-nav-bar #languages-tab");
			var langTabName = langTab.$(".my-nav-bar-column-item-name");

			langTab.click();

			var notSelectedItem = langTab.$$(".my-nav-bar-column-item-content .items .item:not(.selected)");

			expect(langTabName.isDisplayed()).toBe(true);

			langTabName.getText(function (text) {
				notSelectedItem.click();
				expect(notSelectedItem.getAttribute("class")).toContain("selected");

				expect(langTabName.getText()).not.toEqual("text");
			});



			// console.log(expect(items.count()).toEqual(2));

		});

		// var tabsExpandable = $$("my-nav-bar .my-nav-bar-column-item.expandable");
		//
		// tabsExpandable.each(function (tab) {
		// 	tab.isDisplayed()
		// 		.then(function (isVisible) {
		// 			if (!isVisible) {
		// 				return "not visible";
		// 			}
		//
		// 			tab.click();
		//
		// 			it("should expand a visible tab", function () {
		// 				expect(tab.getAttribute("class")).toContain("expanded");
		// 			});
		//
		// 		});
		// });

	});

	// it("should have valid home button", function () {
	// 	var homeButton = getElementByUiSref("app.home");
	// 	expect(homeButton.getAttribute("href")).toEqual("/");
	// });
});