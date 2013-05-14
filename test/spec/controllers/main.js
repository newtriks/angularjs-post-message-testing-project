'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('iframeCommunicationApp'));

  var MainCtrl,
  scope,
  postMessageService,
  messages;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _postMessageService_) {
    scope = $rootScope.$new();
    messages=['foo'];
    spyOn(_postMessageService_, 'messages').andReturn(messages);
    spyOn(_postMessageService_, 'outgoing').andCallThrough();
    postMessageService = _postMessageService_;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should assign messages to scope', function() {
    expect(scope.messages.length).toBe(1);
  });

  it('should have correct message string', function() {
    expect(scope.messages[0]).toBe('foo');
  });

  it('should not call the outgoing() method on postMessageService', function() {
    expect(postMessageService.outgoing).not.toHaveBeenCalled();
  });

  it('should call the outgoing() method on postMessageService', function() {
    scope.sendMessage();
    expect(postMessageService.outgoing).toHaveBeenCalled();
  });

  it('should call the outgoing() method on postMessageService with correct message', function() {
    scope.outgoingMessage = scope.messages[0];
    scope.sendMessage();
    expect(postMessageService.outgoing).toHaveBeenCalledWith(scope.messages[0]);
  });

  it('should clear the scope outgoing message', function() {
    scope.outgoingMessage = scope.messages[0];
    scope.sendMessage();
    expect(scope.outgoingMessage).toBe("");
  });
  
});