const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync');
 
sass.compiler = require('node-sass');

gulp.task('html', function() {
  return gulp.src('./*.html', {since: gulp.lastRun('html')})
    .pipe(gulp.dest('./html/'))
    .pipe(browsersync.stream());
});
 
gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/'))
    .pipe(browsersync.stream());
});

gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: './',
    },
    notify: false,
  });
  gulp.watch('./*.html', {usePolling: true}, gulp.series('html'));
  gulp.watch('./scss/**/*.scss', {usePolling: true}, gulp.series('sass'));
});

exports.default = gulp.series('html', 'sass', 'server');