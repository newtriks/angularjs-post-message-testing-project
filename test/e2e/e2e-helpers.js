angular.scenario.dsl('value', function() {
	return function(value) {
		return this.addFuture('value to future', function(done) {
			done(null, value);
		});
	};
});