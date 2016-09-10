(function() {
    "use strict";

    angular.module("TrytonApp.MyTabs")
        .directive("myTabs", MyTabsDirective);

    function MyTabsDirective() {
        var myTabs = {
            restrict: "E",
            link: function(scope, elem, attrs) {
                var map = new Map();
                (function init() {
                    var tabNames = elem.find("my-tab-name");
                    for (var t = 0; t < tabNames.length; t++) {
                        takeCare(tabNames[t]);
                    }
                    addEvents();
                })();

                function takeCare(tabName) {
                    var angularTab = angular.element(tabName);
                    var bodyId = angularTab.attr("body");
                    var angularBody = getBody(bodyId);
                    map.set(angularTab, angularBody);
                }

                function getBody(id) {
                    var bodies = elem.find("my-tab-body");
                    for (var b = 0; b < bodies.length; b++) {
                        var angularBody = angular.element(bodies[b]);
                        if (angularBody.attr("id") === id) {
                            return angularBody;
                        }
                    }
                }

                function addEvents() {
                    map.forEach(function(body, tab) {
                        tab.on("click", function() {
                            if (!isSelectedTab(tab)) {
                                selectTabProcess(tab);
                                showBodyProcess(body);
                            }
                        })
                    })
                }

                function selectTabProcess(selectedTab) {
                    var tabs = map.keys();

                    while (true) {
                        var tab = tabs.next();
                        if (tab.done) {
                            break;
                        }
                        deselectTab(tab.value);
                    }
                    selectTab(selectedTab);
                }

                function showBodyProcess(bodyToShow) {
                	var bodies = map.values();

                	while (true) {
                		var body = bodies.next();
                		if (body.done) {
                			break;
                		}
                		hideBody(body.value);
                	}
                	showBody(bodyToShow);
                }

                function showBody(body) {
                    body.addClass("showContent");
                }

                function hideBody(body) {
                    body.removeClass("showContent");
                }

                function selectTab(tab) {
                    tab.addClass("selected");
                }

                function deselectTab(tab) {
                    tab.removeClass("selected");
                }

                function isSelectedTab(tab) {
                    return tab.hasClass("selected");
                }
            }
        }

        return myTabs;
    }
})();
