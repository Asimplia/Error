
import Repository = require('asimplia-repository');
import Util = require('asimplia-util');
import services = require('./config/services');

export import Server = require('./Server');
Server;

var _di;
export function getDependencyInjection(): Util.DI.DependencyInjection {
	if (!_di) {
		_di = new Util.DI.DependencyInjection('farfalia-error', services, [
			Repository.getDependencyInjection()
		]);
	}
	return _di;
}
