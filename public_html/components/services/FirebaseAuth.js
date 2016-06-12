var app = angular.module("Authentication");
app.factory("FirebaseAuth", function ($firebaseAuth) {
    var ref = new Firebase("https://project-8315420470750234694.firebaseio.com/");
    return $firebaseAuth(ref);
});