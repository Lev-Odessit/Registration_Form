var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	wiredep = require('wiredep').stream;

gulp.task('css', function () {
	return gulp.src('./app/css/styles.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./app/build/css'));
});

gulp.task('bower', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory: "bower_components"
		}))
		.pipe(gulp.dest('./app'));
});