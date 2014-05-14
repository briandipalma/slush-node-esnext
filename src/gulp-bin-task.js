"use strict";

var path = require("path");

var gulp = require("gulp");
var rename = require("gulp-rename");
var template = require("gulp-template");
var conflict = require("gulp-conflict");
var jsoneditor = require("gulp-json-editor");

var binTemplatesDirectory = path.join(__dirname, "..", "bin_templates", "**");

function renameBinFile(packageName, file) {
	if (file.basename === "package-cli") {
		file.basename = packageName + "-cli";
	}
}

function modifyPackageJsonBin(packageName, packageJson) {
	packageJson.bin = "./bin/" + packageName + "-cli.js";

	return packageJson;
}

function binTaskFinished(done, packageJSONPath, packageName) {
	gulp.src(packageJSONPath)
		.pipe(jsoneditor(modifyPackageJsonBin.bind(null, packageName)))
		.pipe(gulp.dest("./"))
		.on("end", function() {
			done();
		});
}

module.exports = function binTask(done) {
	var packageJSONPath = path.join(process.cwd(), "package.json");
	var packageJSON = require(packageJSONPath);
	var packageName = packageJSON.name;
	var templateData = {packageName: packageName};

	gulp.src(binTemplatesDirectory)
		.pipe(template(templateData))
		.pipe(rename(renameBinFile.bind(null, packageName)))
		.pipe(conflict("./"))
		.pipe(gulp.dest("./"))
		.on("end", binTaskFinished.bind(null, done, packageJSONPath, packageName));
};
