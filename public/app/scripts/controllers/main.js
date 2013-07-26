'use strict';

angular.module('facesQuizApp')
  .controller('MainCtrl', ['$scope', '$timeout', 'Game', 'thoughtworkers',
    function ($scope, $timeout, Game, thoughtworkers) {

    var mistakes = [];

    $scope.loading = true;

    thoughtworkers.query().then(
    	function(people){
    		$scope.game = new Game(people);
    		$scope.loading = false;
    	},
    	function(){
			$scope.loading = false;
			$scope.failure = true;
    	});

    $scope.resetGame = function(){
        $scope.game.reset();
        mistakes = [];
    }

    $scope.isMistake = function(person){
        return mistakes.indexOf(person) >= 0;
    }

    $scope.mistakesAnimationAt = function(index){
        return mistakes[index];
    }
    $scope.guess = doGuess;
    function doGuess(person, index){
        if(mistakes[ index ]) return;

        if( $scope.game.guessPerson(person) ){
            mistakes = [];
            waitToAcceptGuessAgain();
        } else {
            mistakes[ index ] = missAnimations();
        }
    }

    function missAnimations(){
        // var possibilities = ['wobble','fadeOutUp', 'hinge', 'shake', 'swing'],
        var possibilities = ['wobble'],
            rnd = Math.floor(Math.random() * possibilities.length),
            animations = ['miss'];

            animations.push(possibilities[rnd]);

        return animations.join(' ');
    }

    function waitToAcceptGuessAgain(){
        $scope.guess = function(){};
        $timeout(function(){
            $scope.guess = doGuess;
        }, 200);
    }

  }]);
