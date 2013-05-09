'use strict';

angular.module('iframeCommunicationApp')
	.directive('ngPostMessage', function($window, postMessageService) {
	return {
		restrict: 'A',
		controller: function($scope, $attrs, postMessageService) {
            $scope.$on('outgoingMessage', function(evt, message) {
            	if($scope.sender) {
            		var m = JSON.stringify({status: 200, message: message});
                	$scope.sender.postMessage(m, '*');
                }
            });
        },
		link: function postLink(scope, element, attrs) {
			$window.addEventListener('message', function(e) {
				if (e && e.data) {
					var response=null;
					try {
						response = angular.fromJson(e.data);
					} catch (error) {
						response = {message: e.data}
						if(response.message === 'connect') {
							scope.sender = e.source;
							response.message = "Successfully connected";
						}
					}
					postMessageService.messages(response.message);
				}
			});
		}
	};
});