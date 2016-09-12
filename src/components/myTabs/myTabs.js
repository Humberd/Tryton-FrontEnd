(function() {
    "use strict";

    angular.module("TrytonApp.MyTabs")
        .directive("myTabs", MyTabsDirective);

    function MyTabsDirective() {
        // <my-tabs position="left|center|right|stretch">
        //      <my-tab-names class="my-small">
        //          <my-tab-name body="first" select>pierwszy</my-tab-name>
        //          <my-tab-name body="second">drugi</my-tab-name>
        //          <my-tab-name body="third">trzeci</my-tab-name>
        //      </my-tab-names>
        //     <my-tab-bodies>
        //         <my-tab-body id="first">
        //             do pierwszego
        //         </my-tab-body>
        //         <my-tab-body id="second">
        //             do drugiego
        //         </my-tab-body>
        //         <my-tab-body id="third">
        //             do trzeciego
        //         </my-tab-body>
        //     </my-tab-bodies>
        //  </my-tabs>
        var myTabs = {
            restrict: "E",
            link: function(scope, elem, attrs) {
                var map = new Map();

                (function init() {
                    var tabNames = elem.find("my-tab-name");
                    for (var t = 0; t < tabNames.length; t++) {
                        takeCare(tabNames[t]);
                    }

                    checkFirstSelect();
                    addEvents();
                    handlePosition();
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

                function checkFirstSelect() {
                    var tabs = map.keys();

                    while (true) {
                        var tab = tabs.next();
                        if (tab.done) {
                            break;
                        }
                        if (angular.isString(tab.value.attr("select"))) {
                            selectTab(tab.value);
                            showBody(map.get(tab.value))
                            break;
                        }
                    }
                }

                function handlePosition() {
                    var positions = {
                        left: "flex-start",
                        center: "center",
                        right: "flex-end",
                        stretch: "space-around",
                    };

                    var position = attrs.position;
                    if (position === "stretch") {
                        var tabs = map.keys();

                        while (true) {
                            var tab = tabs.next();
                            if (tab.done) {
                                break;
                            }
                            stretchTabNames(tab.value);
                        }
                    }
                    var tabNames = angular.element(elem.find("my-tab-names"));
                    tabNames.addClass(positions[position] || "");
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

                function stretchTabNames(tabs) {
                    tabs.addClass("stretch");
                }

                function isSelectedTab(tab) {
                    return tab.hasClass("selected");
                }
            }
        }

        return myTabs;
    }
})();
