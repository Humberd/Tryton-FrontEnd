describe('Testing app', function() {
	var Loader;
	var $compile;
	var $scope;

	beforeEach(function() {
		module("TrytonApp.Loader");
		module("TrytonApp.Logger")
	});

	beforeEach(function() {
		inject(function (_$injector_, _$compile_, _$rootScope_) {
			Loader = _$injector_.get("Loader");
			$compile = _$compile_;
			$scope = _$rootScope_.$new();
		});
	});

	it('should make Loader defined', function() {
		expect(Loader).toBeDefined();
	});
	it('should register controller when creating directive', function() {
		var element = angular.element("<div loader='testLoader'></div>");
		expect(Loader.getController("testLoader")).not.toBeDefined();
		$compile(element)($scope);


	});
});