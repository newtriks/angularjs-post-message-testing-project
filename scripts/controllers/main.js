'use strict';

angular.module('iframeCommunicationApp')
	.controller('MainCtrl', function($rootScope, $scope, postMessageService) {
	$scope.messages = postMessageService.messages();
	$scope.sendMessage = function() {
		postMessageService.outgoing($scope.outgoingMessage);
		$scope.outgoingMessage = "";
	}
});