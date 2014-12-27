"use strict";

var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var gutil = require('gulp-util');
var del = require('del');

function clean(globFolder) {
	gulp.src(globFolder)
		.pipe(rimraf())
		.on('error', function (err) {
			gutil.log(err);
		});
}

exports.clean = clean;