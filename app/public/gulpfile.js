'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver');

// Clean the temp folders
gulp.task('clean', function () {
  return gulp.src([
    '.sass-cache',
    '.tmp',
    'dist',
    'checkstyle.xml'
  ], { read: false }).pipe(clean());
});

gulp.task('scripts', function () {
  return gulp.src([
      './src/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(jshint.reporter(require('jshint-checkstyle-file-reporter')));
});

gulp.task('browserify', ['clean'], function() {
  return browserify({ debug: true })
    .transform(babelify)
    .require('./src/10years.js', { entry: true })
    .bundle()
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(source('10years.js'))
    .pipe(gulp.dest('./dist'));
});

// Create a server hosting the content of the site
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      https: false,
      open: true
    }));
});

// The default task will launch the server
gulp.task('default', ['webserver'], function () {
  require('opn')('http://localhost:8000');
});
