(function() {
    "use strict";

    angular.module("TrytonApp.Session", [])
        .factory("Session", Session)
        .run(SessionRun);

    function Session() {
        let user;
        let currentExp = 170;
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
                return !!user;
            }
        };
    }

    function SessionRun($rootScope, Session) {
        $rootScope.Session = Session;
    }
})();
