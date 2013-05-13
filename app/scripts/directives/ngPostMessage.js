'use strict';

angular.module('iframeCommunicationApp')
	.directive('ngPostMessage', function($window, postMessageService) {
	return {
		restrict: 'A',
		controller: function($scope, $attrs, postMessageService) {
			$scope.$on('outgoingMessage', function(evt, message) {
				if ($scope.sender) {
					var m = JSON.stringify({
						status: 200,
						message: message
					});
					$scope.sender.postMessage(m, '*');
				}
			});
		},
		link: function postLink(scope, element, attrs) {
			if ($window.addEventListener) {
				$window.addEventListener('message', handler, false);
			} else if ($window.attachEvent) {
				$window.attachEvent("on" + 'message', handler);
			}
			function handler(e) {
				if (e && e.data) {
					var response = null;
					scope.sender = e.source;
					try {
						response = angular.fromJson(e.data);
					} catch (error) {
						response = {
							message: e.data
						}
						if (response.message === 'connect') {
							response.message = "Successfully connected";
						}
					}
					postMessageService.messages(response.message);
				}
			}
		}
	};
});