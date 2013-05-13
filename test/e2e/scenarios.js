'use strict';

describe('iframeCommunicationApp App', function() {

	beforeEach(function() {
		browser().navigateTo('/wrapper.html');
	});

	describe('Main view', function() {
		it('should display the correct route', function() {
			expect(browser().location().path()).toBe('/wrapper.html');
		});

		it('should fail', function() {
			expect(true).toBe(false);
		});
	});
});