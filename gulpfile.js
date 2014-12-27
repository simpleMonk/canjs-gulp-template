"use strict";

var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');

var config = require('./tasks/config.js');
var clean = require('./tasks/clean.js').clean;

var watcher = require('./tasks/watcher.js');
require('./tasks/webserver.js');

gulp.task('clean-dev', function () {
	clean(config.development);
});

gulp.task('copy-all-files', function (cb) {
	runSequence('copy-js-files', 'copy-style', 'copy-html', cb);
});

gulp.task('copy-js-files', function () {
	gulp.src(config.src + "/**/*.js")
		.pipe(concat("bundle.js"))
		.pipe(gulp.dest(config.development))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied js files');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('copy-style', function () {
	gulp.src(config.src + "/**/*.css")
		.pipe(concatcss('app.css'))
		.pipe(gulp.dest(config.development))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied css files');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('copy-html', function () {
	gulp.src(config.src + "/app/index.html")
		.pipe(gulp.dest(config.development))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied css files');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('prepare-dev', function (cb) {
	runSequence('clean-dev', 'copy-all-files', cb);
});

gulp.task('watch', function () {
	watcher([config.src], function () {
		gulp.start('prepare-dev');
	});
});

gulp.task('default', function (cb) {
	runSequence('prepare-dev', 'watch', 'run-dev-server', cb);
});

