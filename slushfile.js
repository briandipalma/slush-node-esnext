"use strict";

var gulp = require("gulp");

var binTask = require("./src/gulp-bin-task");
var defaultTask = require("./src/gulp-default-task");

gulp.task("bin", binTask);
gulp.task("default", defaultTask);
