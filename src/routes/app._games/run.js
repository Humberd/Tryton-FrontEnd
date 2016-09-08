(function() {
    "use strict";

    angular.module("TrytonApp.Router.App._games")
        .run(AppGamesRun)

    function AppGamesRun($rootScope, $state) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            var _gamesState = "app._games";
            var requestedState = toState.$$state();
            var currentGame = "lol";

            //jesli toState jest dzieckiem app._games
            if (includes(requestedState, _gamesState)) {
                //sprawdzam czy moge pobrac toParams.game jako stringa
                if (angular.isObject(toParams) && angular.isString(toParams.game)) {
                    //jesli game param nie byl ustawiony, to ustawiam go na aktualnie wybrana gre
                    //tip: param dodaje sie automatycznie jako pusty string nawet, gdy go nie dodamy recznie
                    if (toParams.game.length === 0) {
                        setParamToCurrentGame();
                    } else { //jesli game param byl ustawiony, to sprawdzam, czy wogole taka gra istnieje

                        //jesli gra game param nie istnieje, to zmieniam param na aktualnie wybrana gre
                        if (!checkIfTheGameExists(toParams.game)) {
                            setParamToCurrentGame();
                        } else {
                            //jesli gra istnieje, to zmieniam aktualnie wybrana gre na nowa
                            changeCurrentGame(toParams.game);
                        }
                    }
                }
            }

            function includes(toState, stateName) {
                return !!toState.includes[stateName];
            }

            function setParamToCurrentGame() {
                event.preventDefault();
                $state.go(toState.name, { game: currentGame });
            }
            //TODO(): zmienic jak bedzie dodany serwis odpowiadajacy
            // za przechowywanie wybranej gry
            function checkIfTheGameExists(name) {
                return true;
            }

            function changeCurrentGame(name) {

            }
        })
    }
})();