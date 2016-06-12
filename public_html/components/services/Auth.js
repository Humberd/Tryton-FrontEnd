var app = angular.module("Authentication");
app.factory("Auth", function (Session, Logger) {
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
});