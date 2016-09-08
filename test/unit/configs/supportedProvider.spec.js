describe('Supported', function() {
    var supportedProvider;
    var supported;

    beforeEach(function() {
        module("TrytonApp.Configs", function(SupportedProvider) {
            supportedProvider = SupportedProvider;
        })
        inject(function(Supported) {
            supported = Supported;
        })
    });

    var tf2 = {
        name: "Team Fortress 2",
        shortName: "TF 2",
        simpleShortName: "tf2",
        isAvailable: true,
        iconUrl: "tf2.png"
    }

    describe('Provider', function() {
        describe('.add()', function() {
            it('should add the game', function() {
                var startLength = supportedProvider.games.getAll().length;
                supportedProvider.games.add(tf2);
                expect(supportedProvider.games.getAll().length).toBe(startLength + 1);
            });
        });
        describe('.get()', function() {
        	beforeEach(function() {
        		supportedProvider.games.add(tf2);
        	});

        	it('should get the game by name', function() {
        		expect(supportedProvider.games.get("Team Fortress 2")).toBeDefined();
        	});
        	it('should get the game by shortName', function() {
        		expect(supportedProvider.games.get("TF 2")).toBeDefined();
        	});
        	it('should get the game by simpleShortName', function() {
        		expect(supportedProvider.games.get("tf2")).toBeDefined();
        	});
        	it('should not get the unknown game', function() {
        		expect(supportedProvider.games.get("the faked named game")).not.toBeDefined();
        	});
        });
        describe('.getAll()', function() {
        	it('should get all the availableGames', function() {
        		supportedProvider.games.add(tf2);

        		expect(supportedProvider.games.getAll().length).toBeGreaterThan(0);
        	});
        });
    });
});
