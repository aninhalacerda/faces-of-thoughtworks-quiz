'use strict';

describe('dispatcher', function () {

  var dispatcher, anotherDispatcher, listener;

  // load the module
  beforeEach(module('facesQuizApp'));

  beforeEach(inject(function($injector) {
    var PubSub = $injector.get('PubSub');
    dispatcher = new PubSub();
    listener = jasmine.createSpy('an listener');
    dispatcher.on('eventName', listener);

    anotherDispatcher = new PubSub();
  }));

  it('should broadcast event', function () {
    dispatcher.broadcast('eventName', 'hello world');
    expect(listener).toHaveBeenCalledWith('eventName', 'hello world');
  });

  it('should stop broadcasting', function (){
    dispatcher.off('eventName');
    dispatcher.broadcast('eventName', 'hello world');
    expect(listener).not.toHaveBeenCalled();
  });

  it('should not call listeners of another dispatcher', function(){
    var anotherListener = jasmine.createSpy('another listener');
    anotherDispatcher.on('eventName', anotherListener);

    dispatcher.broadcast('eventName', 'hello world');
    expect(anotherListener).not.toHaveBeenCalled();

  });



});
