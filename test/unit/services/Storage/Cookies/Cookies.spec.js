describe('Cookies', function() {
    var Cookies;

    beforeEach(function() {
        module("ngCookies");
        module("TrytonApp.Storage.Cookies");
    });
    beforeEach(function() {
        inject(function(_$injector_) {
        	Cookies = _$injector_.get("Cookies");
        });
    });

    var acceptableValues = ["ala ma kota", true, false, undefined, null, 0, 15, {foo: "blah"}, ["first", null]];

    acceptableValues.forEach(function (value) {
    	var type = typeof value;
    	it('should save and get '+type+" type values", function() {
    		Cookies.set("key", value);
    		expect(Cookies.get("key")).toEqual(value);
    		expect(typeof Cookies.get("key")).toBe(type);
    	});
    });

    describe('.is()', function() {
    	it('should check the quality', function() {
    		Cookies.set("key", "foo");
    		expect(Cookies.is("key", "foo")).toBeTruthy();
    		expect(Cookies.is("key", "invalid value")).toBeFalsy();
    	});
    });
});
