var gulp = require('gulp'),
    browserify = require('browserify'),
    through2 = require('through2'),
    babelify = require('babelify'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver'),
    runSequence = require('run-sequence');

gulp.task('build', function () {
    return gulp.src('./src/main.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path, { debug: process.env.NODE_ENV === 'development' })
                .transform(babelify, {presets: ['es2015']})
                .bundle(function (err, res) {
                    if (err) { return next(err); }

                    file.contents = res;
                    next(null, file);
                });
        }))
        .on('error', function (error) {
            console.log(error.stack);
            this.emit('end');
        })
        .pipe(rename('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch(['./src/**/*.js'], ['build']);
});

gulp.task('serve', function() {
    return gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', function(cb) {
    runSequence('build', 'serve', 'watch', cb);
});
