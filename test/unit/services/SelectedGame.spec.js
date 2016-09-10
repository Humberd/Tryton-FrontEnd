describe('SelectedGame', function() {
    var selectedGame;
    var $rootScope;

    var tf2 = {
        name: "Team Fortress 2",
        shortName: "TF 2",
        simpleShortName: "tf2",
        isAvailable: true,
        iconUrl: "tf2.png"
    }
    var cod = {
        name: "Call of Duty",
        shortName: "COD",
        simpleShortName: "cod",
        isAvailable: false,
        iconUrl: "cod.png"
    }

    beforeEach(function() {
        module("TrytonApp.Storage");
        module("TrytonApp.SelectedGame");
        module("TrytonApp.Configs", function(SupportedProvider) {
            SupportedProvider.games.add(tf2);
            SupportedProvider.games.add(cod);
        });
    });

    beforeEach(function() {
        inject(function(_$injector_) {
            selectedGame = _$injector_.get("SelectedGame");
            $rootScope = _$injector_.get("$rootScope");
            spyOn($rootScope, '$broadcast');
        })
    });

    describe('.get()', function() {
        it('should return selectedGame', function() {
            selectedGame.set("tf2");
            expect(selectedGame.get()).toBe("tf2");
        });
    });

    describe('.set()', function() {
        it('should throw when trying to set not a string', function() {
            var values = [true, false, 0, 1, {},
                [], undefined, null
            ];

            values.forEach(function(value) {
                expect(function() {
                    selectedGame.set(value);
                }).toThrow();
            })
        });
        it('should throw when trying to set empty string', function() {
            expect(function() {
                selectedGame.set("");
            }).toThrow();
        });
        it('should throw when the game doesnt exist', function() {
            expect(function() {
                selectedGame.set("not existing game at all")
            }).toThrow();
        });
        it('should throw when the game is not isAvailable', function() {
            expect(function() {
                selectedGame.set("cod");
            }).toThrow("Game: cod is not currently available");
        });
        it('should set the game to simpleShortName', function() {
            console.log(tf2.name);
            selectedGame.set(tf2.name);
            console.log(selectedGame.get());
            expect(selectedGame.get()).toBe(tf2.simpleShortName);
        });
        it('should broadcast message with new selected game on change', function() {
            selectedGame.set("tf2");
            //TODO: remove when bug resolved
            // https://github.com/jasmine/jasmine/issues/1188
            // expect($rootScope.$broadcast).toHaveBeenCalledWith("SelectedNewGame", "tf2");
        });
    });

    describe('.is()', function() {
        it('should check the equality of the strings', function() {
            selectedGame.set("tf2");
            expect(selectedGame.is("tf2")).toBeTruthy();
            expect(selectedGame.is("not a game")).toBeFalsy();
        });
    });
});
