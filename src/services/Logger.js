angular.module("Logger", [])
    .provider("Logger", Logger);

function Logger() {

    var levels = {
        trace: {
            name: "trace",
            priority: 0
        },
        debug: {
            name: "debug",
            priority: 1
        },
        info: {
            name: "info",
            priority: 2
        },
        warn: {
            name: "warn",
            priority: 3
        },
        error: {
            name: "error",
            priority: 4
        }
    };
    //poziom, na jakim obecnie znajduje się Logger
    var level = levels.info;

    //true - wyświetla wiadomości TYLKO z wybranego poziomu
    //false - wyświetla wiadomości z wybranego poziomu i wyżej
    var printOnlySelectedLevel = false;

    return {
        $get: function($filter) {
            function printMessage(type, params) {
                //jesli ma nie wyswietlać nic
                if (level === null) {
                    return;
                }
                var priority = levels[type].priority;

                //sprawdza, czy priorytet jest wystarczająco wysoki
                if (priority >= level.priority) {
                    if (printOnlySelectedLevel && level.priority !== priority) {
                        return;
                    }

                    //zmienna przechowująca nazwę funkcji, która wywołała loggera
                    var functionName = params.callee.caller.name;
                    //zamieniam obiekt parametrów na tablicę parametrów
                    var params = Array.prototype.slice.call(params);
                    //dodaję prefix z parametrem nazwy funkcji, która wywoała logger
                    params[0] = addPrefix(functionName) + params[0];
                    //dodaję suffix
                    params.push(addSuffix());

                    //wywołuję metodę z parametrami z tablicy
                    console[type].apply(console, params);
                }
            }
            //dodaje to, co ma wyswietlac przed wiadomością
            function addPrefix(functionName) {
                if (angular.isString(functionName) && functionName.length > 0) {
                    functionName += "  --  ";
                }
                return $filter("date")(new Date(), "HH:mm:ss") + "  --  " + functionName;
            }

            function addSuffix() {
                return "";
            }

            return {
                levels: levels,
                getLevel: function() {
                    return level;
                },
                setLevel: function(newLevel) {
                    level = newLevel;
                },
                isPrintOnlySelectedLevel: function() {
                    return printOnlySelectedLevel;
                },
                setPrintOnlySelectedLevel: function(newValue) {
                    if (typeof(newValue) === "boolean") {
                        printOnlySelectedLevel = newValue;
                    }
                },
                trace: function(message) {
                    printMessage("trace", arguments);
                },
                debug: function(message) {
                    printMessage("debug", arguments);
                },
                info: function(message) {
                    printMessage("info", arguments);
                },
                warning: function(message) {
                    printMessage("warn", arguments);
                },
                error: function(message) {
                    printMessage("error", arguments);
                },
                log: function(message) {
                    console.log(message);
                }
            };
        }
    };
}
