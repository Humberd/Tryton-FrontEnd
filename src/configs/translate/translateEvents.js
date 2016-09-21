(function() {
    "use strict";

    angular.module("TrytonApp.Translate")
        .run(TranslateEvents);

    function TranslateEvents($rootScope, tmhDynamicLocale, Logger) {
        //przy kazdej zmianie języka musi zmieniać też locale
        $rootScope.$on("$translateChangeSuccess", function TranslateEvent(arg1, langObj) { //<-------dodać logger
            tmhDynamicLocale.set(langObj.language);
            Logger.info("Successfully changed language to [%s]", langObj.language);
        });
        $rootScope.$on("$translateChangeError", function TranslateEvent(arg1, langObj) { //<-------dodać logger
            Logger.error("Cannot change language to [%s]", langObj.language);
        });
    };
})();
