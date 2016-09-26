var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	uncss = require('gulp-uncss'),
	connect = require('gulp-connect'),
	wiredep = require('wiredep').stream;

// Server connect
gulp.task('connect', function () {
	connect.server({
		root: "app",
		livereload: true
	});
});

// html
gulp.task('html', function(){
	gulp.src('app/index.html')
		.pipe(connect.reload());
});

gulp.task('css', function () {
	return gulp.src('./app/css/styles.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./app/build/css')) // normal main css file
		.pipe(minifyCSS())
		.pipe(rename('styles.min.css'))  // minimal main css file
		.pipe(gulp.dest('./app/build/css'));
});

// remove unusing css classes
gulp.task('unusing_css', function () {
	return gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
		.pipe(uncss({
			html: ['app/index.html']
		}))
		.pipe(gulp.dest('build/css'));
});

gulp.task('bower', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory: "bower_components"
		}))
		.pipe(gulp.dest('./app'));
});

// watch
gulp.task('watch', function () {
	gulp.watch('css/*.styl',['css']);
	gulp.watch('app/index.html',['html']);
});

// default
gulp.task('default',['bower','html','css','unusing_css','watch','connect']);