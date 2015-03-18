
var AppError = require("./build/src/index");
var Repository = require("asimplia-repository");
var Util = require("asimplia-util");
var ConnectionDispatcher = Repository.ConnectionDispatcher;

var di = AppError.getDependencyInjection();
var connectionDispatcher = di.service(ConnectionDispatcher);
var mongoDbDsn = process.env.MONGODB_DSN || 'mongodb://localhost:27017/farfalia';
var postgresDsn = process.env.POSTGRES_DSN || 'postgres://postgres@localhost:5432/farfalia';

var server;
console.info('Starting Error');
connectionDispatcher.connectMongoDB(mongoDbDsn, function () {
	connectionDispatcher.connectPostgres(postgresDsn, function () {
		server = di.service(AppError.Server);
		server.start();
	});
});
