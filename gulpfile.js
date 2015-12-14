// LOAD
var gulp = require("gulp"),
  util = require("gulp-util"),
  sass = require("gulp-sass"),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  del = require('del'),
  watch = require('gulp-watch'),
  log = util.log,
  coffee = require('gulp-coffee');


// TASKS

// Build CSS
gulp.task("sass", function(){
  log("Generate CSS files " + (new Date()).toString());
    gulp.src('src/sass/**/*.s*ss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer("last 2 version","safari 5", "ie 8", "ie 9"))
    .pipe(gulp.dest("css"))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
    gulp.src(['src/css/normalize.css',
      'src/css/main.min.css' ])
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css'));
});

// Build coffee script
gulp.task('coffee', function() {
  gulp.src('src/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', log))
    .pipe(gulp.dest('src/js-gen/'))
});

// Minify JS
gulp.task('js', function() {
  log("Minify JS files " + (new Date()).toString());
  return gulp.src(['src/js/**/*.js','src/js-gen/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('src/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'JS Minify task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['css', 'js'], cb)
});

// Default
gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'coffee','js');
});

// WATCH
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/sass/**/*.sass', ['sass']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['js']);

});