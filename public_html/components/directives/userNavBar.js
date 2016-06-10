var app = angular.module("TrytonApp");
app.directive("userNavBar", function () {
    var prefix = "./components/views/";
    return {
        restrict: "A",
        templateUrl: prefix+"userNavBar.html"
    };
});