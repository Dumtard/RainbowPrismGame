var gulp = require('gulp')
var browserify = require('browserify')
var through2 = require('through2')
var babelify = require('babelify')
var rename = require('gulp-rename')
var webserver = require('gulp-webserver')
var runSequence = require('run-sequence')
var standard = require('gulp-standard')
var path = require('path')

gulp.task('build', function () {
  return gulp.src('./src/main.js')
  .pipe(through2.obj(function (file, enc, next) {
    browserify(file.path, { debug: process.env.NODE_ENV === 'development' })
    .transform(babelify, {presets: ['es2015']})
    .bundle(function (err, res) {
      if (err) {
        return next(err)
      }

      file.contents = res;
      next(null, file);
    })
  }))
  .on('error', function (error) {
    console.log(error.stack)
    this.emit('end')
  })
  .pipe(rename('main.js'))
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('lint', function () {
  return gulp.src('./src/**/*.js')
  .pipe(standard())
  .pipe(standard.reporter('default', {
    breakOnError: false,
    breakOnWarnings: false
  }))
})

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js'], function () {
    runSequence('lint', 'build')
  })
})

gulp.task('serve', function () {
  return gulp.src('./dist')
  .pipe(webserver({
    livereload: true,
    open: true
  }))
})

gulp.task('default', function (cb) {
  runSequence('lint', 'build', 'serve', 'watch', cb)
})
