(function() {
    "use strict";

    angular.module("TrytonApp.Authentication", ["vcRecaptcha"])
        .factory("Auth", Auth);

    function Auth(Session, Logger) {
        var returnObject = {
            login: function AuthLogin(credentials) {
                Session.setUser(credentials);
                Logger.info("Successfully logged in [%s]", credentials.username);
            },
            register: function AuthRegister(credentials) {
                returnObject.login(credentials);
                Logger.info("Successfully registered [%s]", credentials.username);
            },
            logout: function AuthLogout() {
                Session.setUser();
                Logger.info("Successfully logged out");
            }
        };
        return returnObject;
    }
})();
