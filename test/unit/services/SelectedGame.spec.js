describe('SelectedGame', function() {
    var SelectedGame;
    beforeEach(function() {
        module("TrytonApp.SelectedGame");
    });

    beforeEach(function() {
        inject(function(_$injector_) {
            SelectedGame = _$injector_.get("SelectedGame")
        })
    });

    describe('.get()', function() {
    	it('should return selectedGame', function() {
    		SelectedGame.set("lol");
    		expect(SelectedGame.get()).toBe("lol");
    	});
    });
    describe('.set()', function() {
    	it('should throw when trying to set not a string', function() {
    		var values = [true, false, 0, 1, {}, [], undefined, null];

    		values.forEach(function (value) {
    			expect(function () {
    				SelectedGame.set(value);
    			}).toThrow();
    		})
    	});
    	it('should throw when trying to set empty string', function() {
    		expect(function () {
    			SelectedGame.set("");
    		}).toThrow();
    	});
    });
    describe('.is()', function() {
    	it('should check the equality of the strings', function() {
    		SelectedGame.set("lol");
    		expect(SelectedGame.is("lol")).toBeTruthy();
    		expect(SelectedGame.is("csgo")).toBeFalsy();
    	});
    });
});
