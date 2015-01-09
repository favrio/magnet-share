var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

// STYLES
gulp.task('styles', function() {
    return gulp.src('src/styles/*.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        // .pipe(gulp.dest('public/stylesheets/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/stylesheets/'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// SCRIPTS
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        // .pipe(gulp.dest('public/scripts/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts/'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

// CLEAN
gulp.task('clean', function(cb) {
    del(['public/stylesheets/', 'public/scripts/'], cb)
});

// WATCH
gulp.task('watch', function() {
    // Watch .LESS files
    gulp.watch('src/styles/*.less', ['styles']);
    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);
});

var lessFiles = "src/styles/*.less";

gulp.task('default', function() {
    gulp.watch(lessFiles, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        less2css(event.path);
    });
});

function less2css(files) {
    return gulp.src(files)
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        // .pipe(gulp.dest('public/stylesheets/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/stylesheets/'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
}