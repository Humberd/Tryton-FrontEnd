(function() {
    "use strict";

    angular.module("TrytonApp.Session", [])
        .factory("Session", Session)
        .run(SessionRun);

    function Session() {
        var user;
        return {
            getUser: function() {
                return user;
            },
            setUser: function(newUser) {
                user = newUser;
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
