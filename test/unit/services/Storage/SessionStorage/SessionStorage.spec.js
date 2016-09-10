describe('SessionStorage', function() {
    var SessionStorage;

    beforeEach(function() {
        module("ngCookies");
        module("TrytonApp.Storage.SessionStorage");
    });

    beforeEach(function() {
        inject(function(_$injector_) {
            SessionStorage = _$injector_.get("SessionStorage");
        });
    });

    var acceptableValues = ["ala ma kota", true, false, undefined, null, 0, 15, {foo: "blah"}, ["first", null]];

    acceptableValues.forEach(function (value) {
    	var type = typeof value;
    	it('should save and get '+type+" type values", function() {
    		SessionStorage.set("key", value);
    		expect(SessionStorage.get("key")).toEqual(value);
    		expect(typeof SessionStorage.get("key")).toBe(type);
    	});
    });

    describe('.is()', function() {
    	it('should check the quality', function() {
    		SessionStorage.set("key", "foo");
    		expect(SessionStorage.is("key", "foo")).toBeTruthy();
    		expect(SessionStorage.is("key", "invalid value")).toBeFalsy();
    	});
    });
});
