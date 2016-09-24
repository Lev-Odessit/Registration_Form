var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	wiredep = require('wiredep').stream;

gulp.task('css', function () {
	return gulp.src('./app/css/styles.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./app/build/css')) // normal main css file
		.pipe(minifyCSS())
		.pipe(rename('styles.min.css'))  // minimal main css file
		.pipe(gulp.dest('./app/build/css'));
});

gulp.task('bower', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory: "bower_components"
		}))
		.pipe(gulp.dest('./app'));
});