(function() {
    "use strict";

    angular.module("TrytonApp.Translate")
        .factory("NotExistingTranslationHandler", NotExistingTranslationFactory);


    //handler obsługi nieistniejących tłumaczeń
    function NotExistingTranslationFactory(Logger) {
        function NotExistingTranslationHandler(translationId, lang) {
            var string = "Missing_Translation(" + translationId + ", " + lang + ")";
            Logger.warning(string);
            return string;
        }
        return NotExistingTranslationHandler;
    }
})();
