"use strict";

var path = require("path");

var gulp = require("gulp");
var inquirer = require("inquirer");
var rename = require("gulp-rename");
var install = require("gulp-install");
var template = require("gulp-template");
var conflict = require("gulp-conflict");

var prompts = [{
	type: "input",
	name: "packageName",
	default: "node-esnext-package",
	message: "What do you want to call your new node ES next package?"
}];

var templatesDirectory = path.join(__dirname, "templates", "**");
var binTemplatesDirectory = path.join(__dirname, "bin_templates", "**");

function renameBinFile(packageName, file) {
	if (file.basename === "package-cli") {
		file.basename = packageName + "-cli";
	}
}

function binTask(done) {
	var packageJSONPath = path.join(process.cwd(), "package");
	var packageJSON = require(packageJSONPath);
	var packageName = packageJSON.name;
	var templateData = {packageName: packageName};

	gulp.src(binTemplatesDirectory)
		.pipe(template(templateData))
		.pipe(rename(renameBinFile.bind(null, packageName)))
		.pipe(conflict("./"))
		.pipe(gulp.dest("./"))
		.on("end", function() {
			done();
		});
}

function questionsAnswered(done, answers) {
	gulp.src(templatesDirectory)
		.pipe(template(answers))
		.pipe(conflict("./"))
		.pipe(gulp.dest("./"))
		.pipe(install())
		.on("end", function() {
			done();
		});
}

function defaultTask(done) {
	inquirer.prompt(prompts, questionsAnswered.bind(null, done));
}

gulp.task("bin", binTask);
gulp.task("default", defaultTask);
