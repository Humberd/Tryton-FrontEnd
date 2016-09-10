describe('LocalStorage', function() {
    var LocalStorage;

    beforeEach(function() {
        module("ngStorage");
        module("TrytonApp.Storage.LocalStorage");
    });
    beforeEach(function() {
        inject(function(_$injector_) {
            LocalStorage = _$injector_.get("LocalStorage");
        })
    });

    var acceptableValues = ["ala ma kota", true, false, undefined, null, 0, 15, {foo: "blah"}, ["first", null]];

    acceptableValues.forEach(function (value) {
    	var type = typeof value;
    	it('should save and get '+type+" type values", function() {
    		LocalStorage.set("key", value);
    		expect(LocalStorage.get("key")).toEqual(value);
    		expect(typeof LocalStorage.get("key")).toBe(type);
    	});
    });

    describe('.is()', function() {
    	it('should check the quality', function() {
    		LocalStorage.set("key", "foo");
    		expect(LocalStorage.is("key", "foo")).toBeTruthy();
    		expect(LocalStorage.is("key", "invalid value")).toBeFalsy();
    	});
    });
});
