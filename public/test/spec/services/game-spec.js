describe('game', function() {
  var game, startListener = jasmine.createSpy('startListener');


  // load the modules
  beforeEach(module('fixtures'));
  beforeEach(module('facesQuizApp'));

  // setup services e mock expectation
  beforeEach(inject(function($injector) {
    var thoughtworkers = $injector.get('thoughtworkers'),
        Game = $injector.get('Game')

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET('api/thoughtworkers.json').respond($injector.get('people'));

    //feed the collection
    thoughtworkers.query().then(function(people){
      game = new Game('test game', people);
      game.on('start', startListener);
      game.start();
    });

    $httpBackend.flush();

  }));

  describe('events', function(){

    it('should dispatch start event', function(){
      expect(startListener).toHaveBeenCalledWith('start', game);
    });

    it('should dispatch reset event', function(){
      var resetListener = jasmine.createSpy('resetListener');
      game.on('reset', resetListener);
      game.reset();
      expect(resetListener).toHaveBeenCalledWith('reset', game);
    });

    it('should dispatch point event', function(){
      var pointListener = jasmine.createSpy('pointListener'),
          person = game.challengePerson;

      game.on('point', pointListener);
      game.guessPerson( person )
      expect(pointListener).toHaveBeenCalledWith('point', person);
    });

    it('should dispatch mistake event', function(){
      var mistakeListener = jasmine.createSpy('mistakeListener'),
          wrongPerson;

      do { wrongPerson = game.challengeGroup.getRandom() }
      while( game.challengePerson === wrongPerson )

      game.on('mistake', mistakeListener);
      game.guessPerson( wrongPerson )
      expect(mistakeListener).toHaveBeenCalledWith('mistake', game.challengePerson);
    });

    it('should dispatch gameover', function(){
      var gameoverListener = jasmine.createSpy('gameoverListener'),
          numberOfPeopleToGuess = game.people.size();

      for (var i = 0; i < numberOfPeopleToGuess - 1; i++) {
        game.guessPerson( game.challengePerson );
      }

      //1 right guess to win

      game.on('gameover', gameoverListener);
      game.guessPerson( game.challengePerson );
      expect(gameoverListener).toHaveBeenCalledWith('gameover', game);

    });

  });

  describe('rules', function(){
    it('should tell the person to be recognized in the turn', function(){
      expect(game.challengePerson).toBeDefined();
    });

    it('should give four people where the challenge person where in', function(){
      expect(game.challengeGroup.size()).toBe(4);
      expect(game.challengeGroup.contains( game.challengePerson )).toBeTruthy();
    });

    it('should score up when guess right', function(){
      expect(game.statistics.score).toBe(0);
      // do a right guess ( passing th expected value)
      game.guessPerson( game.challengePerson );
      expect(game.statistics.score).toBe(1);
    });

    it('should end game', function(){
      var numberOfPeopleToGuess = game.people.size();

      for (var i = 0; i < numberOfPeopleToGuess - 1; i++) {
        game.guessPerson( game.challengePerson );
      };

      //1 right guess to win
      expect( game.ended ).toBeFalsy();
      game.guessPerson( game.challengePerson );

      expect( game.ended ).toBeTruthy();
    });
  });

});




