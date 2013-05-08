'use strict';

describe('Service: postMessageService', function () {

  // load the service's module
  beforeEach(module('iframeCommunicationApp'));

  // instantiate service
  var postMessageService;
  beforeEach(inject(function (_postMessageService_) {
    postMessageService = _postMessageService_;
  }));

  it('should do something', function () {
    expect(!!postMessageService).toBe(true);
  });

});
