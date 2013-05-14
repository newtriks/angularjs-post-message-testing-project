'use strict';

describe('Directive: ngPostMessage', function() {
	var elm, scope, postMessageService, $document, messages;

	beforeEach(angular.mock.module('iframeCommunicationApp'));

	beforeEach(inject(function($rootScope, $compile, $window, _postMessageService_) {
		scope = $rootScope;
		postMessageService = _postMessageService_;
		messages=['foo'];
		elm = angular.element('<div ng-post-message ></div>');
		scope.sender = jasmine.createSpyObj('sender', ['postMessage']);
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
});