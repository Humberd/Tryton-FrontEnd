(function() {
    "use strict";

    angular.module("TrytonApp.Translate")
        .provider("LanguageList", LanguageList);

    function LanguageList() {
        var templateLanguage = {
            name: "Polish",
            shortName: "pl",
            isAvailable: true
        };

        var list = [];

        var methods = {
            getAll: function() {
                return list;
            },
            getAllShortNames: function() {
                return list.map(function(language) {
                    return language.shortName;
                });
            },
            get: function(lang) {
                for (var p in list) {
                    if (list[p].shortName === lang) {
                        return list[p];
                    }
                }
            },
            put: function(name, shortName, isAvailable) {
                var newLanguage = {
                    name: name,
                    shortName: shortName,
                    isAvailable: isAvailable
                };

                //sprawdzam, czy w liście istnieje język ze skrótem takim,
                // jaki jest w parametrze; jeśli tak, to go edytuje
                var edited = list.some(function(language, index, array) {
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
        var returnObject = function() {};
        returnObject.prototype = methods;
        returnObject.prototype.$get = function() {
            return methods;
        };
        return new returnObject();
    };
})();
