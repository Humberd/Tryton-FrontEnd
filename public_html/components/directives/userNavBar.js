var app = angular.module("TrytonApp");
app.directive("userNavBar", function (ViewUrl) {
    return {
        restrict: "A",
        templateUrl: ViewUrl + "userNavBar.html",
        controller: "userNavBarController"
    };
});