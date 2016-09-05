describe("Testing Loader Service", function() {
    var Loader;
    var $compile;
    var $scope;
    var $rootScope;
    var element;
    var $httpBackend;

    beforeEach(function() {
        module("TrytonApp.Loader");
        module("TrytonApp.Logger");
        module("TrytonApp.Configs");
    });

    beforeEach(function() {
        inject(function(_$injector_, _$compile_, _$rootScope_, _$httpBackend_) {
            Loader = _$injector_.get("Loader");
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
        });
    });

    beforeEach(function() {
        element = angular.element("<div loader='testLoader'></div>");
    });


    it('should be Loader defined', function() {
        expect(Loader).toBeDefined();
    });

    it('should register controller when creating directive', function() {
        expect(function() {
            Loader.getController("testLoader");
        }).toThrow();

        $compile(element)($scope);
        expect(Loader.getController("testLoader")).toBeDefined();

        $scope.$destroy();
        expect(function() {
            Loader.getController("testLoader");
        }).toThrow();
    });

    it('should not start loading not existing loader', function() {
        expect(function() {
            Loader.startLoading("testLoader")
        }).toThrow();
    });
    it('should not stop loading not existing loader', function() {
        expect(function() {
            Loader.stopLoading("testLoader")
        }).toThrow();
    });
    it('should not set error state not existing loader', function() {
        expect(function() {
            Loader.setErrorState("testLoader")
        }).toThrow();
    });
    it('should not unset error state not existing loader', function() {
        expect(function() {
            Loader.unsetErrorState("testLoader")
        }).toThrow();
    });
    it('should not start watching not existing loader', function() {
        expect(function() {
            Loader.watchLoading("testLoader");
        }).toThrow();
    });
    it('should not start watching invalid expression', function() {
        $compile(element)($scope);

        expect(function() {
            Loader.watchLoading("testLoader", true, $scope);
        }).toThrow();
    });
    it('should not start watching without a valid scope', function() {
        $compile(element)($scope);

        expect(function() {
            Loader.watchLoading("testLoader", "foo", {});
        }).toThrow();
    });

    it('should start loading', function() {
    	$httpBackend.expectGET("html/loaderLoading.html").respond(200);
        $compile(element)($scope);

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        Loader.startLoading("testLoader");
        expect(Loader.isLoading("testLoader")).toBeTruthy();
    });

    it('should stop loading', function() {
    	$httpBackend.expectGET("html/loaderLoading.html").respond(200);
        $compile(element)($scope);

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        Loader.startLoading("testLoader");
        expect(Loader.isLoading("testLoader")).toBeTruthy();
        Loader.stopLoading("testLoader");
        expect(Loader.isLoading("testLoader")).toBeFalsy();
    });

    it('should set error state', function() {
    	$httpBackend.expectGET("html/loaderError.html").respond(200);
        $compile(element)($scope);

        expect(Loader.isError("testLoader")).toBeFalsy();
        Loader.setErrorState("testLoader");
        expect(Loader.isError("testLoader")).toBeTruthy();
    });

    it('should unset error state', function() {
    	$httpBackend.expectGET("html/loaderError.html").respond(200);
        $compile(element)($scope);

        expect(Loader.isError("testLoader")).toBeFalsy();
        Loader.setErrorState("testLoader");
        expect(Loader.isError("testLoader")).toBeTruthy();
        Loader.unsetErrorState("testLoader");
        expect(Loader.isError("testLoader")).toBeFalsy();
    });

    it('should unset error state when starting loading', function() {
    	$httpBackend.expectGET("html/loaderLoading.html").respond(200);
    	$httpBackend.expectGET("html/loaderError.html").respond(200);
        $compile(element)($scope);

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        expect(Loader.isError("testLoader")).toBeFalsy();

        Loader.setErrorState("testLoader");

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        expect(Loader.isError("testLoader")).toBeTruthy();

        Loader.startLoading("testLoader");

        expect(Loader.isLoading("testLoader")).toBeTruthy();
        expect(Loader.isError("testLoader")).toBeFalsy();
    });

    it('should stop loading when setting error state', function() {
    	$httpBackend.expectGET("html/loaderLoading.html").respond(200);
    	$httpBackend.expectGET("html/loaderError.html").respond(200);
        $compile(element)($scope);

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        expect(Loader.isError("testLoader")).toBeFalsy();

        Loader.startLoading("testLoader");

        expect(Loader.isLoading("testLoader")).toBeTruthy();
        expect(Loader.isError("testLoader")).toBeFalsy();

        Loader.setErrorState("testLoader");

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        expect(Loader.isError("testLoader")).toBeTruthy();
    });

    it('should watch variable to trigger loading', function() {
    	$httpBackend.expectGET("html/loaderLoading.html").respond(200);
        $compile(element)($scope);

        $scope.toggler = false;
        Loader.watchLoading("testLoader", "toggler", $scope);
        expect(Loader.isLoading("testLoader")).toBeFalsy();
        $scope.toggler = true;
        $scope.$digest();
        expect(Loader.isLoading("testLoader")).toBeTruthy();
    });

    afterEach(function() {
        // $httpBackend.verifyNoOutstandingExpectation();
        // $httpBackend.verifyNoOutstandingRequest();
    });
});
