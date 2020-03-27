var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var minifycss = require('gulp-minify-css');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/material-kit.scss',
  SCSS: './assets/scss/**/**',
};

gulp.task('compile-scss', function() {
  return gulp
    .src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});

gulp.task('open', function() {
  gulp.src('presentation.html').pipe(open());
});

//CSS 파일을 minify
gulp.task('minifycss', function() {
  return gulp
    .src(Paths.SCSS_TOOLKIT_SOURCES) //css 폴더의 main.css 파일을
    .pipe(minifycss()) //포함되어 있는 @import를 분석해서 하나의 파일로 병합하고 minify 해서
    .pipe(gulp.dest(CSS)); //dist 폴더에 저장
});

gulp.task('open-app', gulp.parallel('open', 'watch'));
