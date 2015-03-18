
import AppError = require('../../src/index');
import Repository = require("asimplia-repository");
import IntegrationPreparer = Repository.IntegrationPreparer;

describe('blank', () => {
	var di = AppError.getDependencyInjection();
	var i: IntegrationPreparer = di.service('tests.IntegrationPreparer');
	beforeEach((done) => {
		i.startup(done);
	});

	describe('sandbox integration test', () => {
		beforeEach((done) => {
			i.setup(done);
		});

		it('should started', () => {
			expect(true).toBeTruthy();
		});
	});
});
