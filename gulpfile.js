const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');

function style() {
	// sass setting
	return gulp.src('./_src/scss/app.scss') // where scss files are
	.pipe(sass({ style: 'compressed' })) // scss function & error setting
	.pipe(gulp.dest('./dest/css')) //stream changes to all browser

	// browser sync setting
	.pipe(browserSync.stream())
}

function image() {
	gulp.src('./_src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./_src/min_images/'));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './dest/'
		}
	})
	gulp.watch('./_src/images/*', imagemin);
	gulp.watch('./_src/scss/**/*.scss', style);
	gulp.watch('./dest/*.html').on('change', browserSync.reload);
	gulp.watch('./dest/js/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.image = image;
exports.watch = watch;
