module.exports = function (grunt) {
	var GruntConfiguration = require('asimplia-util').GruntConfiguration;

	var tsFiles = ["src/**/*.ts", "tests/**/*.ts"];
	var tsModulesFiles = ["node_modules/asimplia-repository/src/**/*.ts", "node_modules/asimplia-util/src/**/*.ts"];

 	// Project configuration.
	var config = GruntConfiguration([], [], [], tsFiles.concat(tsModulesFiles), tsFiles, [
		'typings/tsd.d.ts',
		GruntConfiguration.resolveNodeModulePath('asimplia-repository/asimplia-repository.d.ts'),
		GruntConfiguration.resolveNodeModulePath('asimplia-util/asimplia-util.d.ts')
	], __dirname);
	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-tsd');
	grunt.loadNpmTasks('grunt-develop');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-wait');

	grunt.registerTask('default', [
		'clean:build', 'shell:link_module:asimplia-repository', 'shell:link_module:asimplia-util', 'tsd:reinstall', 'wait:typings', 'typescript:build', 'jasmine_node:unit'
	]);
	grunt.registerTask('dev', function () {
		GruntConfiguration.typescriptReferences(__dirname + '/build/references.ts', [
			__dirname + '/src', 
			__dirname + '/tests', 
			__dirname + '/typings', 
			__dirname + '/node_modules/asimplia-repository/src',
			__dirname + '/node_modules/asimplia-util/src',
			__dirname + '/node_modules/asimplia-repository/asimplia-repository.d.ts',
			__dirname + '/node_modules/asimplia-util/asimplia-util.d.ts'
		]);
		grunt.task.run('typescript:build', 'jasmine_node:unit', 'develop:app', 'watch:ts');
	});
	grunt.registerTask('prepublish', function () {
		grunt.task.run('default');
	});
	grunt.registerTask('test', function () {
		process.env.NODE_ENV = 'unit';
		grunt.task.run('jasmine_node:unit');
		process.env.NODE_ENV = 'integration';
		process.env.PORT = '18115';
		grunt.task.run('jasmine_node:integration');
	});

};
