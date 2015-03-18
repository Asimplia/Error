
import http = require("http");
import ApiProvider = require('./Api/ApiProvider');

export = Server;
class Server {

	static $service = 'Server';
	static $inject = [
		'http.Server',
		ApiProvider
	];
	constructor(
		private server: http.Server,
		private apiProvider: ApiProvider
	) {}

	start() {
		var port = process.env.PORT || 8500;
		this.apiProvider.provide();

		this.server.listen(port, (e: Error) => {
			if (e) {
				console.error(e);
				return;
			}
			console.log('Express server listening on port ' + port);
		});
	}
}
