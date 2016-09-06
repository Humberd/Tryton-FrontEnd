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

    function expectLoadTpl() {
    	$httpBackend.expectGET("html/loaderLoading.html").respond(200, "");
    }
    function expectErrorTpl() {
    	$httpBackend.expectGET("html/loaderError.html").respond(200, "");
    }
    function flush() {
    	$httpBackend.flush();
    }


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
    	expectLoadTpl();
        $compile(element)($scope);

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        Loader.startLoading("testLoader");
        expect(Loader.isLoading("testLoader")).toBeTruthy();
        flush();
    });

    it('should stop loading', function() {
    	expectLoadTpl();
        $compile(element)($scope);

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        Loader.startLoading("testLoader");
        expect(Loader.isLoading("testLoader")).toBeTruthy();
        Loader.stopLoading("testLoader");
        expect(Loader.isLoading("testLoader")).toBeFalsy();
        flush();
    });

    it('should set error state', function() {
    	expectErrorTpl();
        $compile(element)($scope);

        expect(Loader.isError("testLoader")).toBeFalsy();
        Loader.setErrorState("testLoader");
        expect(Loader.isError("testLoader")).toBeTruthy();
        flush();
    });

    it('should unset error state', function() {
    	expectErrorTpl();
        $compile(element)($scope);

        expect(Loader.isError("testLoader")).toBeFalsy();
        Loader.setErrorState("testLoader");
        expect(Loader.isError("testLoader")).toBeTruthy();
        Loader.unsetErrorState("testLoader");
        expect(Loader.isError("testLoader")).toBeFalsy();
        flush();
    });

    it('should unset error state when starting loading', function() {
    	expectErrorTpl();
    	expectLoadTpl();
        $compile(element)($scope);

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        expect(Loader.isError("testLoader")).toBeFalsy();

        Loader.setErrorState("testLoader");

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        expect(Loader.isError("testLoader")).toBeTruthy();

        Loader.startLoading("testLoader");

        expect(Loader.isLoading("testLoader")).toBeTruthy();
        expect(Loader.isError("testLoader")).toBeFalsy();
        flush();
    });

    it('should stop loading when setting error state', function() {
    	expectLoadTpl();
    	expectErrorTpl();
        $compile(element)($scope);

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        expect(Loader.isError("testLoader")).toBeFalsy();

        Loader.startLoading("testLoader");

        expect(Loader.isLoading("testLoader")).toBeTruthy();
        expect(Loader.isError("testLoader")).toBeFalsy();

        Loader.setErrorState("testLoader");

        expect(Loader.isLoading("testLoader")).toBeFalsy();
        expect(Loader.isError("testLoader")).toBeTruthy();
        flush();
    });

    it('should watch variable to trigger loading', function() {
        expectLoadTpl();
        $compile(element)($scope);

        $scope.toggler = false;
        Loader.watchLoading("testLoader", "toggler", $scope);
        expect(Loader.isLoading("testLoader")).toBeFalsy();
        $scope.toggler = true;
        $scope.$digest();
        expect(Loader.isLoading("testLoader")).toBeTruthy();
        flush();
    });

    it('should not start loading before element compiles', function() {
    	expect(function () {
    		Loader.startLoading("testLoader");
    	}).toThrow();
    	$compile(element)($scope);
    });

    it('should immediately start loading if I call start loading eventually', function() {
    	expectLoadTpl();
        $compile(element)($scope);

        Loader.startLoadingEventually("testLoader");
        expect(Loader.isLoading("testLoader")).toBeTruthy();
        flush();
    });

    it('should wait for loader to start loading till its is loaded', function() {
    	expectLoadTpl();

    	Loader.startLoadingEventually("testLoader");
    	expect(function () {
    		Loader.isLoading("testLoader");
    	}).toThrow();
    	expect(Loader.isPending("testLoader")).toBeTruthy();

    	$compile(element)($scope);
    	expect(Loader.isPending("testLoader")).toBeFalsy();
    	expect(Loader.isLoading("testLoader")).toBeTruthy();
    	flush();
    });

    it('should wait for loader to start watching till its loaded', function() {
    	expectLoadTpl();

    	Loader.watchLoadingEventually("testLoader", "foo", $scope);
    	expect(function () {
    		Loader.isLoading("testLoader");
    	}).toThrow();
    	expect(Loader.isPending("testLoader")).toBeTruthy();

    	$compile(element)($scope);
    	expect(Loader.isPending("testLoader")).toBeFalsy();
    	expect(Loader.isLoading("testLoader")).toBeFalsy();

    	$scope.foo = true;

    	$scope.$digest();
    	expect(Loader.isLoading("testLoader")).toBeTruthy();
    	flush();
    });

    it('should wait for loader to set error state till its loaded', function() {
    	expectErrorTpl();

    	Loader.setErrorStateEventually("testLoader");
    	expect(function () {
    		Loader.isError("testLoader");
    	}).toThrow();
    	expect(Loader.isPending("testLoader")).toBeTruthy();

    	$compile(element)($scope);
    	expect(Loader.isPending("testLoader")).toBeFalsy();
    	expect(Loader.isError("testLoader")).toBeTruthy();
    	flush();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
