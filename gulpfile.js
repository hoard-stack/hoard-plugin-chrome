var gulp = require("gulp"),
babel = require("gulp-babel");

var jsFiles = [
    './src/*.js',
    './src/features/*.js'
];

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/*.js', ['build-js']);
  gulp.watch('./src/*.css', ['build-css']);
});

gulp.task('build-js', function() {
    return gulp.src(jsFiles, {base: 'src'})
          .pipe(babel())
          .on('error', console.error.bind(console))
          .pipe(gulp.dest('./dist'))
});

gulp.task('build-libs', function() {
  return gulp.src('./src/libs/*.js')
          .pipe(babel())
          .on('error', console.error.bind(console))
          .pipe(gulp.dest('./dist/libs'))
});

gulp.task('build-html', function() {
  return gulp.src('./src/*.html')
          .on('error', console.error.bind(console))
          .pipe(gulp.dest('./dist'))
});

gulp.task('build-css', function() {
  return gulp.src('./src/content/css/*.css')
          .on('error', console.error.bind(console))
          .pipe(gulp.dest('./dist/content/css/'))
});

gulp.task('build-images', function() {
  return gulp.src('./src/content/images/*')
          .on('error', console.error.bind(console))
          .pipe(gulp.dest('./dist/content/images/'))
});

gulp.task('build-manifest', function() {
  return gulp.src('./src/manifest.json')
          .on('error', console.error.bind(console))
          .pipe(gulp.dest('./dist'))
});


gulp.task('build', ['build-js', 'build-libs', 'build-html', 'build-css', 'build-images', 'build-manifest']);