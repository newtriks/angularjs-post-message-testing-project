'use strict';

describe('Service: postMessageService', function() {

  // load the service's module
  beforeEach(module('iframeCommunicationApp'));

  // instantiate service
  var postMessageService, messages, rootScope;

  beforeEach(inject(function($rootScope, _postMessageService_) {
    postMessageService = _postMessageService_;
    rootScope = $rootScope;
    messages = ["foo", "bar"];
  }));

  it('should have a service', function() {
    expect(postMessageService).not.toEqual(null);
  });

  it('should have no messages', function() {
    expect(postMessageService.messages[0]).toBeUndefined();
  });

  it('should store a message in the messages array', function() {
    var m = postMessageService.messages(messages[0]);
    expect(m).not.toBeUndefined();
  });

  it('should store and retrieve the correct message', function() {
    var m = postMessageService.messages(messages[0]);
    expect(m[0]).toEqual(messages[0]);
  });

  it('should broadcast an outgoing message', function() {
    var outgoingMessageListener = jasmine.createSpy('listener');
    rootScope.$on('outgoingMessage', outgoingMessageListener);
    postMessageService.outgoing(messages[0]);
    expect(outgoingMessageListener).toHaveBeenCalled();
  });

  it('should broadcast the correct outgoing message', function() {
    var outgoingMessageListener = jasmine.createSpy('listener');
    rootScope.$on('outgoingMessage', outgoingMessageListener);
    postMessageService.outgoing(messages[0]);
    expect(outgoingMessageListener.mostRecentCall.args[1]).toEqual(messages[0]);
  });

});