(function() {
    "use strict";

    angular.module("TrytonApp")
        .directive("myNavBar", MyNavBar);

    function MyNavBar(ViewUrl, Modal, Auth, Logger, $translate, $document) {
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
                                notItemAngular.removeClass("show");
                                notItemAngular.parent().removeClass("expanded");
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
                    })
                });

                $document.on("click", function() {
                	if (selectedPill) {
                		selectedPill.removeClass("show");
                		selectedPill.parent().removeClass("expanded");
                		selectedPill = null;
                	}
                })

                function findContentPills() {
                    return document.querySelectorAll("#my-nav-bar .my-nav-bar-column-item-content");
                }

                /////ng-click()//////////
                $scope.openLoginModal = function openLoginModal() {
                    var resolver = {
                        registerModal: function() {
                            return $scope.openRegisterModal;
                        }
                    };
                    Modal("login.html", "loginController", "login", resolver).result
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
                    Modal("register.html", "registerController", "register", resolver).result
                        .then(function(result) {
                            Auth.register(result);
                        }, function(reason) {

                        });
                };
                $scope.logout = function logout() {
                    Auth.logout();
                };
                // $scope.selectedLanguage = $translate.proposedLanguage() || $translate.use();

                // $scope.$watch("selectedLanguage", function(newVal, oldVal) {
                //     if (angular.isString(newVal) && newVal !== oldVal) {
                //         $translate.use(newVal);
                //     }
                // });
            }
        }
    }

})();
