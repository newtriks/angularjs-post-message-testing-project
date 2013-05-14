'use strict';

describe('Directive: ngPostMessage', function() {
	var elm, scope, postMessageService, testWindow, messages, callback;

	beforeEach(angular.mock.module('iframeCommunicationApp'));

	beforeEach(inject(function($rootScope, $compile, $window, _postMessageService_) {
		scope = $rootScope;
		testWindow = $window;
		postMessageService = _postMessageService_;
		// create dummy messages for testing
		messages=['foo'];
		// Create spies
		scope.sender = jasmine.createSpyObj('sender', ['postMessage']);
		spyOn(_postMessageService_, 'messages').andCallThrough();
		spyOn($window, 'addEventListener');
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

	it('should handle addEventListener to the $window', function() {
		expect(testWindow.addEventListener).toHaveBeenCalled();
	});

	it('should call messages method on postMessageService', function() {
		var evt = document.createEvent('Event');
		evt.initEvent('message', true, true);
		testWindow.dispatchEvent(evt);
		expect(postMessageService.messages).toHaveBeenCalled();
	});

});