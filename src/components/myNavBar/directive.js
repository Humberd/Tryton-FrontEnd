(function() {
    "use strict";

    angular.module("TrytonApp")
        .directive("myNavBar", MyNavBar);

    function MyNavBar(ViewUrl, Modal, Auth, Logger, $translate,
        $document, Supported, SelectedGame) {
        return {
            restrict: "E",
            templateUrl: ViewUrl + "myNavBar.html",
            link: function(scope, elem, attrs) {
                var $scope = scope;

                //if element have item-content class
                var itemsToExpand = findContentPills();
                var selectedPill;
                itemsToExpand.forEach(function(item, index, array) {
                    var angularItem = angular.element(item);

                    //dla wszystkich pillow, co maja content
                    angularItem.parent().on("click", function(event) {

                        //dla kazdego pilla, co nie jest kliknietym - odznaczam go
                        array.forEach(function(notItem, index2) {
                            if (index2 !== index) {
                                var notItemAngular = angular.element(notItem);
                                hide(notItemAngular);
                            }
                        });

                        //dla kliknietego pilla - zaznaczam go
                        angularItem
                            .toggleClass("show")
                            .parent().toggleClass("expanded");

                        //jesli zaznaczam pilla, to wrzucam go do zmiennej, zeby click na $document mogl go odkliknac
                        selectedPill = angularItem.hasClass("show") ? angularItem : null;

                        event.stopPropagation();
                    });

                    angularItem.on("click", function(event) {
                        event.stopPropagation();
                    });
                });

                $document.on("click", function() {
                    if (selectedPill) {
                        hide(selectedPill);
                        selectedPill = null;
                    }
                })

                $scope.foldOnClick = function() {
                    if (selectedPill) {
                        hide(selectedPill);
                        selectedPill = null;
                    }
                }

                function findContentPills() {
                    return document.querySelectorAll("#my-nav-bar .my-nav-bar-column-item-content");
                }


                function hide(item) {
                    item.removeClass("show");
                    item.parent().removeClass("expanded");
                }

                /////ng-click()//////////
                $scope.openLoginModal = function openLoginModal() {
                    var resolver = {
                        registerModal: function() {
                            return $scope.openRegisterModal;
                        }
                    };
                    Modal("login.html", "loginController", resolver)
                        .then(function(result) {
                            Auth.login(result);
                        }, function(reason) {

                        });
                };
                $scope.openRegisterModal = function openRegisterModal() {
                    var resolver = {
                        loginModal: function() {
                            return $scope.openLoginModal;
                        }
                    };
                    Modal("register.html", "registerController", resolver)
                        .then(function(result) {
                            Auth.register(result);
                        }, function(reason) {

                        });
                };
                $scope.logout = function logout() {
                    Auth.logout();
                };
                /////////////////lang functions//////////
                $scope.availableLanguages = Supported.languages.getAll();
                $scope.selectedLanguage = $translate.proposedLanguage() || $translate.use();
                $scope.selectedLanguageItem;

                $scope.$watch("selectedLanguage", function(newVal, oldVal) {
                    if (angular.isString(newVal)) {
                        $scope.selectedLanguageItem = Supported.languages.get(newVal);
                        if (newVal !== oldVal) {
                            $translate.use(newVal);
                        }
                    }
                });
                $scope.isSelectedLang = function(shortName) {
                    if (shortName.toLowerCase() === $scope.selectedLanguage.toLowerCase()) {
                        return "selected";
                    }
                }
                $scope.selectLang = function(shortName) {
                    $scope.selectedLanguage = shortName.toLowerCase();
                }

                ////////////games functions//////////////
                $scope.availableGames = Supported.games.getAll();
                $scope.selectedGame = SelectedGame.get();
                $scope.selectedGameItem;

                $scope.$watch("selectedGame", function(newVal, oldVal) {
                    if (angular.isString(newVal)) {
                        $scope.selectedGameItem = Supported.games.get(newVal);
                    }
                })

                $scope.isSelectedGame = function(simpleShortName) {
                    if (simpleShortName.toLowerCase() === $scope.selectedGame.toLowerCase()) {
                        return "selected";
                    }
                }
                $scope.selectGame = function(simpleShortName) {
                    SelectedGame.set(simpleShortName);
                    $scope.selectedGame = SelectedGame.get();
                }
            }
        }
    }

})();
