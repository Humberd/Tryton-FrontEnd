(function() {
    "use strict";

    angular.module("TrytonApp.Configs")
        .provider("Supported", Supported);

    function Supported(GamesIconsUrl) {
        function Item(name, shortName, isAvailable, iconUrl, simpleShortName) {
            this.name = name;
            this.shortName = shortName;
            this.isAvailable = isAvailable;
            this.iconUrl = iconUrl;
            this.simpleShortName = simpleShortName;
        }

        var items = (function() {
            function ItemsList() {
                this.games = [];
                this.languages = [];
            }
            ItemsList.prototype.add = function(listName, item) {
                if (item instanceof Item) {
                    this[listName].push(item);
                } else {
                    console.warn("%s is not an instance of Item", item);
                }
            }
            ItemsList.prototype.get = function(listName, phrase) {
                try {
                    phrase = phrase.toLowerCase();
                    var foundItem = this[listName].find(function(item) {
                        if (item.name.toLowerCase() === phrase) {
                            return item;
                        }
                        if (item.shortName.toLowerCase() === phrase) {
                            return item;
                        }
                        if(item.simpleShortName.toLowerCase() === phrase) {
                            return item;
                        }
                    });

                    return angular.copy(foundItem);
                } catch (err) {
                    return undefined;
                }
            }
            ItemsList.prototype.getAll = function(listName) {
                return angular.copy(this[listName]);
            }
            return new ItemsList();
        })();

        return {
            "games": {
                add: function(configs) {
                    var defaultUrl = GamesIconsUrl;
                    var icon = configs.iconUrl ? defaultUrl + configs.iconUrl : "";
                    var item = new Item(configs.name, configs.shortName, configs.isAvailable, icon, configs.simpleShortName);
                    items.add("games", item);
                },
                get: function(phrase) {
                    return items.get("games", phrase);
                },
                getAll: function() {
                    return items.getAll("games");
                }
            },
            "languages": {
                add: function(configs) {
                    var defaultUrl = "/";
                    var icon = configs.iconUrl ? configs.iconUrl : defaultUrl + configs.shortName;
                    var item = new Item(configs.name, configs.shortName, configs.isAvailable, icon, configs.simpleShortName);
                    items.add("languages", item);
                },
                get: function(phrase) {
                    return items.get("languages", phrase);
                },
                getAll: function() {
                    return items.getAll("languages");
                }
            },
            "$get": function() {
                return {
                    "games": {
                        get: function(phrase) {
                            return items.get("games", phrase);
                        },
                        getAll: function() {
                            return items.getAll("games");
                        }
                    },
                    "languages": {
                        get: function(phrase) {
                            return items.get("languages", phrase);
                        },
                        getAll: function() {
                            return items.getAll("languages");
                        }
                    }
                }
            }
        };
    }
})();
