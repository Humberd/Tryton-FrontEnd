(function() {
    "use strict";

    angular.module("TrytonApp.Translate")
        .config(TranslateConfig);

    function TranslateConfig($translateProvider, LanguageListProvider, tmhDynamicLocaleProvider) {
        LanguageListProvider.put("Polski", "pl", true);
        LanguageListProvider.put("English", "en", true);
        LanguageListProvider.put("Francais", "fr", false);

        //ustawiam język, z którego ma brać  tłumaczenia, jeśli zabraknie ich w swoim
        //    $translateProvider.fallbackLanguage("en");

        //ustala, w jaki sposób ma wyświetlać tłumaczenia,
        //czy parsować kod html, czy zostawić jako string
        $translateProvider.useSanitizeValueStrategy("escape");

        //wyświetla wiadomość w konsoli, jeśli odwołuję się do nie istniejącego tłumaczenia
        $translateProvider.useMissingTranslationHandler("NotExistingTranslationHandler");

        //rejestruje dostępne możliwe języki
        $translateProvider.registerAvailableLanguageKeys(LanguageListProvider.getAllShortNames());
        $translateProvider.determinePreferredLanguage();

        //zapisuje wybór w LocalStorage
        $translateProvider.useLocalStorage();

        //dynamicznie pobiera pliki .json z tłumaczeniami
        $translateProvider.useStaticFilesLoader({
            prefix: "langs/",
            suffix: ".json"
        });

        //ustawiam ścieżkę do plików locals
        tmhDynamicLocaleProvider.localeLocationPattern("langs/locals/angular-locale_{{locale}}.js");
    }
})();
