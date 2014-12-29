"use strict";

var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var minifyCSS = require('gulp-minify-css');


var config = require('./tasks/config.js');
var clean = require('./tasks/clean.js').clean;
var watcher = require('./tasks/watcher.js');
require('./tasks/webserver.js');

gulp.task('clean-dev', function (cb) {
	clean(config.development, cb);
});

gulp.task('copy-all-files', function (cb) {
	runSequence('copy-js-files', 'copy-style', 'copy-html', 'copy-spec-files', cb);
});

gulp.task('copy-js-files', ['lint-js-files'], function () {
	var files = config.vendorjs;
	files.push(config.src + "/app/**/*.js");

	gulp.src(files)
		.pipe(uglify())
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

gulp.task('copy-spec-files', ['lint-spec-files'], function () {
	var files = config.vendorjs;
	files.push(config.src + "/app/**/*.js");
	files.push(config.spec + "/**/*.js");

	gulp.src(files)
		.pipe(concat("spec.js"))
		.pipe(gulp.dest(config.development + "/spec"))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied spec files');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('lint-js-files', function () {
	gulp.src(config.src + "/app/**/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('lint-spec-files', function () {
	var files = [];
	files.push(config.src + "/app/**/*.js");
	files.push(config.spec + "/**/*.js");

	gulp.src(files)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('copy-style', function () {
	var files = [];
	files.push(config.vendor + "/**/*.scss");
	files.push(config.vendor + "/**/*.css");
	files.push(config.src + "/**/*.scss");
	files.push(config.src + "/**/*.css");

	gulp.src(files)
		.pipe(sass())
		.pipe(concatcss('app.css'))
		.pipe(minifyCSS())
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
			gutil.log('successfully copied index.html');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('prepare-dev', ['clean-dev'], function (cb) {
	runSequence('copy-all-files', cb);
});

gulp.task('watch', function () {
	watcher([config.src, config.spec], function () {
		gulp.start('prepare-dev');
	});
});

gulp.task('default', function (cb) {
	runSequence('prepare-dev', 'watch', 'run-dev-server', cb);
});

