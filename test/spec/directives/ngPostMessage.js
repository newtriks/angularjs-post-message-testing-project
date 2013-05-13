'use strict';

describe('Directive: ngPostMessage', function () {
  beforeEach(module('iframeCommunicationApp'));

  var element;

  it('should fail', inject(function ($rootScope, $compile) {
    element = angular.element('<ng-post-message></ng-post-message>');
    element = $compile(element)($rootScope);
    //expect(true).toBe(false);
  }));
});
