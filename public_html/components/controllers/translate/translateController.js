var app = angular.module("Translate", ["pascalprecht.translate", "ngSanitize", "ngCookies", "tmh.dynamicLocale"]);
app.config(function ($translateProvider, LanguageListProvider) {
    LanguageListProvider.put("Polski", "pl", true);
    LanguageListProvider.put("English", "en", true);
    LanguageListProvider.put("Francais", "fr", false);
    
    //ustawiam język, z którego ma brać  tłumaczenia, jeśli zabraknie ich w swoim
    $translateProvider.fallbackLanguage("en");

    //ustala, w jaki sposób ma wyświetlać tłumaczenia,
    //czy parsować kod html, czy zostawić jako string
    $translateProvider.useSanitizeValueStrategy(null);

    //rejestruje dostępne możliwe języki
    $translateProvider.registerAvailableLanguageKeys(LanguageListProvider.getAllShortNames());
    $translateProvider.determinePreferredLanguage();

    //zapisuje wybór w LocalStorage
    $translateProvider.useLocalStorage();

    //dynamicznie pobiera pliki .json z tłumaczeniami
    $translateProvider.useStaticFilesLoader({
        prefix: "languages/",
        suffix: ".json"
    });
});
app.config(function (tmhDynamicLocaleProvider) {
    //ustawiam ścieżkę do plików locals
    tmhDynamicLocaleProvider.localeLocationPattern("./languages/locals/angular-locale_{{locale}}.js");
});
app.run(function ($rootScope, tmhDynamicLocale) {
    //przy kazdej zmianie języka musi zmieniać też locale
    $rootScope.$on("$translateChangeSuccess", function (arg1, langObj) {
        tmhDynamicLocale.set(langObj.language);
    });
});
//przechowuje listę języków
app.provider("LanguageList", function () {
    //szablon języka
    var templateLanguage = {
        name: "Polish",
        shortName: "pl",
        isAvailable: true
    };
    var list = [];

    var methods = {
        getAll: function () {
            return list;
        },
        getAllShortNames: function () {
            return list.map(function (language) {
                return language.shortName;
            });
        },
        get: function (lang) {
            for (var p in list) {
                if (list[p].shortName === lang) {
                    return list[p];
                }
            }
        },
        put: function (name, shortName, isAvailable) {
            var newLanguage = {
                name: name,
                shortName: shortName,
                isAvailable: isAvailable
            };

            //sprawdzam, czy w liście istnieje język ze skrótem takim,
            // jaki jest w parametrze; jeśli tak, to go edytuje
            var edited = list.some(function (language, index, array) {
                if (language.shortName === shortName) {
                    array[index] = newLanguage;
                    return true;
                } else {
                    return false;
                }
            });

            //jeśli nie edytowałem istniejącego języka, to go dodaje
            if (!edited) {
                list.push(newLanguage);
            }
        }
    };

    //chcę, aby LanguageList oraz LanguageListProvider miały te same metody
    var returnObject = function () {};
    returnObject.prototype = methods;
    returnObject.prototype.$get = function () {
        return methods;
    };
    return new returnObject();
});
app.controller("translateController", function ($scope, $translate, LanguageList, $locale) {
    $scope.LanguageList = LanguageList;
    $scope.selectedLanguage = $translate.proposedLanguage() || $translate.use();
    
    $scope.$watch("selectedLanguage", function (newVal, oldVal) {
        if (angular.isString(newVal)) {
            $translate.use(newVal);
        };
    });
});