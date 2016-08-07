(function() {
    "use strict";

    angular.module("TrytonApp.Session", [])
        .factory("Session", Session)
        .run(SessionRun);

    function Session() {
        var user;
        var currentExp = 170;
        return {
            getUser: function() {
                return user;
            },
            setUser: function(newUser) {
                user = newUser;
            },
            getUserExp: function () {
                return currentExp;
            },
            setUserExp: function (exp) {
                currentExp = exp;
            },
            isLogged: function() {
                return user ? true : false;
            }
        };
    }

    function SessionRun($rootScope, Session) {
        $rootScope.Session = Session;
    }
})();
