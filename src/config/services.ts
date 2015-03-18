
import express = require("express");
import http = require("http");
import Util = require('asimplia-util');
import Repository = require('asimplia-repository');

export = services;
var services: { [name: string]: any } = {
	'http.Server': {
		$inject: ['express.Express'],
		$factory: (app: express.Express) => {
			return http.createServer(app);
		}
	},
	'express.Express': {
		$factory: () => {
			return express();
		},
	},
	'Repository:Error.ConsoleLogging': {
		$args: [
			Repository.Entity.Error.ApplicationTypeEnum.ERROR
		],
		$class: Repository.Error.ConsoleLogging
	},
	'Util:ErrorLogger': Util.ErrorLogger,
	'Util:AOP.AspectInterception': {
		$class: Util.AOP.AspectInterception,
		$inject: [
			Util.DI.ServiceAutoload, 
			Repository.Error.ConsoleLogging,
			Util.Env.EnvConfigOverrider,
			Util.Collection.Progress.ProgressListLogger,
			Util.Console.LogPrefixer,
		],
		$factory: (
			serviceAutoload: Util.DI.ServiceAutoload,
			consoleLogging: Repository.Error.ConsoleLogging,
			envConfigOverrider: Util.Env.EnvConfigOverrider,
			progressListLogger: Util.Collection.Progress.ProgressListLogger,
			logPrefixer: Util.Console.LogPrefixer
		) => {
			return new Util.AOP.AspectInterception('farfalia-error', {
				'Util.Env.EnvConfigOverrider': envConfigOverrider,
				'Util:DI.ServiceAutoload': serviceAutoload,
				'Repository:Error.ConsoleLogging': consoleLogging,
				'Util:Collection.Progress.ProgressListLogger': progressListLogger,
				'Util:Console.LogPrefixer': logPrefixer,
			})
		}
	},
	'Util:AOP.AnnotationAspects': {
		$class: Util.AOP.AnnotationAspects,
		$args: [__dirname + '/..']
	},
	'Util:DI.ServiceAutoload': {
		$class: Util.DI.ServiceAutoload,
		$args: [__dirname + '/..']
	},
	'Util:Env.EnvConfigOverrider': {
		$class: Util.Env.EnvConfigOverrider,
		$args: [__dirname + '/../../..']
	},
	'Util:Collection.Progress.ProgressListLogger': Util.Collection.Progress.ProgressListLogger,
	'Util:Console.LogPrefixer': Util.Console.LogPrefixer,
};