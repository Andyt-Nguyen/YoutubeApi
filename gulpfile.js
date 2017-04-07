var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	CacheBust = require('gulp-cachebust'),
	print = require('gulp-print'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify');

	var cachebust = new CacheBust();

gulp.task('build-css', function(){
	gulp.src('./styles/*') //wheere to output
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(cachebust.resources()) //Out with the old in with the new
	.pipe(concat('styles.css')) //Put all sass files into one style.css
	.pipe(sourcemaps.write('./maps')) //writes everything into maps folder
	.pipe(gulp.dest('./dist')) //everything goes into dist
})

gulp.task('build-js', function() {
   return gulp.src('js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js')) //mash into one file
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))  //spits file in dist
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('build-lib', function() {
   return gulp.src('Bootstrap-Youtube-Popup-Player-Plugin-master/*.js')
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('lib.js')) //mash into one file
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))  //spits file in dist
      .pipe(gulp.dest('./dist/lib'));
});

gulp.task('build', ['build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
});
