(function() {
    "use strict";

    angular.module("TrytonApp.Configs")
        .provider("Supported", Supported);

    function Supported() {
        function Item(name, shortName, isAvailable, iconUrl) {
            this.name = name;
            this.shortName = shortName;
            this.isAvailable = isAvailable;
            this.iconUrl = iconUrl;
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
                add: function(name, shortName, isAvailable, iconUrl) {
                    var defaultUrl = "/";
                    var icon = iconUrl ? iconUrl : defaultUrl + shortName;
                    var item = new Item(name, shortName, isAvailable, icon);
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
                add: function(name, shortName, isAvailable, iconUrl) {
                    var defaultUrl = "/";
                    var icon = iconUrl ? iconUrl : defaultUrl + shortName;
                    var item = new Item(name, shortName, isAvailable, icon);
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
