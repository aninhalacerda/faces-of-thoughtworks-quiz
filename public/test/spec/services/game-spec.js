describe('game', function() {
  var game;


  // load the modules
  beforeEach(module('fixtures'));
  beforeEach(module('facesQuizApp'));

  // setup services e mock expectation
  beforeEach(inject(function($injector) {
    var thoughtworkers = $injector.get('thoughtworkers'),
        Game = $injector.get('Game');

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET('api/thoughtworkers.json').respond($injector.get('people'));

    //feed the collection
    thoughtworkers.query().then(function(people){
      game = new Game(people);
    });

    $httpBackend.flush();

  }));


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




