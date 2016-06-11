var app = angular.module("TrytonApp");
app.controller("userNavBarController", function ($scope, Modal) {
    $scope.foo = "dupa";
    console.dir(Modal("login.html","","login"));
//    $uibModal.open({
//        templateUrl: ViewUrl + "modal/" + "login.html"
//    });
});