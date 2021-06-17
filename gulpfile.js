const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const short = require('gulp-shorthand');
const browsersync = require('browser-sync');
 
sass.compiler = require('node-sass');

function pug2html() {
  return gulp.src('./pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./'))
    .pipe(browsersync.stream());
};
 
function sass2css() {
  return gulp.src('./scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(short())
    .pipe(clean({ level: 2 }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/'))
    .pipe(browsersync.stream());
};

function server() {
  browsersync.init({
    server: {
      baseDir: './',
    },
    notify: false,
  });
  gulp.watch('./pug/**/*.pug', {usePolling: true}, gulp.series(pug2html));
  gulp.watch('./scss/**/*.scss', {usePolling: true}, gulp.series(sass2css));
};

exports.default = gulp.series(gulp.parallel(pug2html, sass2css), server);