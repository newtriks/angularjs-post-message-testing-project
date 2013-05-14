'use strict';

describe('Directive: ngPostMessage', function() {
	var elm, scope, postMessageService, messages;

	beforeEach(angular.mock.module('iframeCommunicationApp'));

	beforeEach(inject(function($rootScope, $compile, _postMessageService_) {
		scope = $rootScope;
		postMessageService = _postMessageService_;
		// create dummy messages for testing
		messages=['foo', '{"message":"foo"}', 'connect'];
		// Create spies
		scope.sender = jasmine.createSpyObj('sender', ['postMessage']);
		spyOn(_postMessageService_, 'messages').andCallThrough();
		// Create angular element
		elm = angular.element('<div ng-post-message ></div>');
		// Compile the element
		$compile(elm)(scope);
		scope.$digest();
	}));

	it('should create the element', function() {
		expect(elm).not.toBeNull();
	});

	it('should post the message', function() {
		scope.$broadcast('outgoingMessage', messages[0]);
		expect(scope.sender.postMessage).toHaveBeenCalled();
	});

	it('should JSON stringify the message on post', function() {
		scope.$broadcast('outgoingMessage', messages[0]);
		expect(scope.sender.postMessage).toHaveBeenCalledWith('{"status":200,"message":"'+messages[0]+'"}', '*');
	});

	it('should call messages() on postMessageService', function() {
		scope.sendMessageToService({data:messages[1]});
		expect(postMessageService.messages).toHaveBeenCalled();
	});

	it('should call messages() on postMessageService decoding JSON message', function() {
		scope.sendMessageToService({data:messages[1]});
		expect(postMessageService.messages).toHaveBeenCalledWith(messages[0]);
	});

	it('should send a custom message to postMessageService if "connect"', function() {
		scope.sendMessageToService({data:messages[2]});
		expect(postMessageService.messages).toHaveBeenCalledWith("Successfully connected");
	});

	it('should send string message to postMessageService if JSON decoding fails', function() {
		scope.sendMessageToService({data:messages[1]});
		expect(postMessageService.messages).toHaveBeenCalledWith("foo");
	});

});