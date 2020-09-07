const {dest, series, src} = require('gulp')
const postcss = require('gulp-postcss')
const scss = require('postcss-scss')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

function clean(cb) {
	cb()
}

// CSS bundle, minify task
function cssTask() {
	// const sourcemaps = require('gulp-sourcemaps')
	return (
		src('./src/css/main.css')
			// .pipe(sourcemaps.init())
			.pipe(postcss([precss, autoprefixer, cssnano], {syntax: scss}))
			// .pipe(sourcemaps.write('.'))
			.pipe(dest('build/css'))
	)
}

function build(cb) {
	cb()
}

exports.default = series(clean, cssTask, build)
// // const gulp = require('gulp');
// const {src, dest, task, watch, series, parallel} = require('gulp') //When use this line instead of above line, change method without [gulp.] ex. gulp.dest => dest
// const sass = require('gulp-sass')
// const concat = require('gulp-concat')
// const minify = require('gulp-minify')
// const autoprefixer = require('gulp-autoprefixer')
// const babel = require('gulp-babel')
// const browserSync = require('browser-sync').create()
// const imagemin = require('gulp-imagemin')
// const mozjpeg = require('imagemin-mozjpeg')
// const pngquant = require('imagemin-pngquant')
// const fileinclude = require('gulp-file-include')

// // CSS bundle, minify task
// function cssTask() {
// 	return (
// 		src('./src/scss/*.scss')
// 			// .pipe(sass().on('error', sass.logError))
// 			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
// 			.pipe(autoprefixer())
// 			.pipe(dest('./dist/css'))
// 			.pipe(browserSync.stream())
// 	)
// }

// // HTML task
// function htmlTask() {
// 	return src('./src/index.html').pipe(dest('./dist/'))
// 	// .pipe(browserSync.stream())
// }

// // JS Babel & minify task
// function jsTask() {
// 	return (
// 		src('./src/js/**/*.js')
// 			.pipe(concat('app.js'))
// 			.pipe(babel({presets: ['@babel/preset-env']}))
// 			.pipe(minify())
// 			// .pipe(minify({ ext: { src: '-debug.js', min: '.js' }, ignoreFiles: ['-min.js'] }))
// 			.pipe(dest('./dist/js'))
// 			.pipe(browserSync.stream())
// 	)
// }

// // Image minify task
// function imageTask() {
// 	return src('./src/images/*')
// 		.pipe(
// 			imagemin([
// 				pngquant({
// 					quality: [0.3, 0.5], // [minimum, maximum]
// 				}),
// 				mozjpeg({
// 					quality: 40,
// 				}),
// 			])
// 		)
// 		.pipe(dest('./dist/images'))
// 		.pipe(browserSync.stream())
// }

// // File include task
// function fileincludeTask() {
// 	return src(['./src/index.html'])
// 		.pipe(
// 			fileinclude({
// 				prefix: '@@',
// 				basepath: '@file',
// 			})
// 		)
// 		.pipe(dest('./dist/'))
// }

// // Watch task
// function watchTask() {
// 	browserSync.init({
// 		server: {
// 			baseDir: './dist/', //Destination folder
// 		},
// 	})
// 	watch('./src/images/*', imageTask)
// 	watch('./src/scss/**/*.scss', cssTask)
// 	watch('./src/js/*.js', jsTask)
// 	watch('./src/*.html', fileincludeTask).on('change', browserSync.reload)
// 	watch('./src/*.html', htmlTask).on('change', browserSync.reload)
// 	// watch('./dist/*.html').on('change', browserSync.reload)
// 	// watch('./dest/js/*.js').on('change', reloadBrowser); //Use when change js files directly
// }

// // Export tasks  -- To start task, "gulp TASKNAME"
// exports.clean = cleanTask
// exports.image = imageTask //ig. "gulp image"
// exports.style = cssTask
// exports.js = jsTask
// exports.html = htmlTask
// exports.fileinclude = fileincludeTask
// exports.watch = watchTask

// // Default task
// exports.default = series(cleanTask, parallel(imageTask, vendorTask, cssTask, jsTask), htmlTask, fileincludeTask, watchTask)
