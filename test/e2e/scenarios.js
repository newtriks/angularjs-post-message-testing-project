'use strict';

describe('iframeCommunicationApp App', function() {

	beforeEach(function() {
		browser().navigateTo('/');
	});

	describe('Main view', function() {
		it('should display the correct route', function() {
			expect(browser().location().path()).toBe('/');
		});
	});
});