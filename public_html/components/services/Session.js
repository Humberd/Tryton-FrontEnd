var app = angular.module("TrytonApp");
app.run(function ($rootScope, Session) {
    $rootScope.Session = Session;
});
app.factory("Session", function () {
    var user;
    return {
        getUser: function() {
            return user;
        },
        setUser: function (newUser) {
            user = newUser;
        },
        isLogged: function () {
            return user ? true : false;
        }
    };
});