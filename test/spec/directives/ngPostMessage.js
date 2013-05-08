'use strict';

describe('Directive: ngPostMessage', function () {
  beforeEach(module('iframeCommunicationApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<ng-post-message></ng-post-message>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ngPostMessage directive');
  }));
});
