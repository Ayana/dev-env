// const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp') //When use this line instead of above line, change method without [gulp.] ex. gulp.dest => dest
const del = require('del')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
const fileinclude = require('gulp-file-include')
const sourcemaps = require('gulp-sourcemaps')

// When you need to replace path for production
// const assetpaths = require('gulp-assetpaths')
// const dirPath = '/wp/wp-content/themes/YOURTHEME/assets'

// 1. Clean dist folder
function cleanTask() {
	return del(['./dist'])
}

// 2. CSS - autoprefixer, bundle, minify, sourcemaps, replace path(when needed)
function cssTask() {
	return (
		src('./src/scss/*.scss')
			.pipe(sourcemaps.init())
			// .pipe(sass().on('error', sass.logError))
			.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
			.pipe(autoprefixer())
			// Change path when you needed
			// .pipe(
			// 	assetpaths({
			// 		newDomain: dirPath,
			// 		oldDomain: '../../',
			// 		docRoot: 'dist',
			// 		filetypes: ['jpg', 'png', 'svg', 'css'],
			// 	})
			// )
			.pipe(sourcemaps.write())
			.pipe(dest('./dist/css'))
			.pipe(browserSync.stream())
	)
}

// 3. JS - bundle, babel, minify, sourcemaps
function jsTask() {
	return (
		src('./src/js/**/*.js')
			.pipe(sourcemaps.init())
			.pipe(concat('bundle.js'))
			.pipe(babel({ presets: ['@babel/preset-env'] }))
			.pipe(minify())
			// .pipe(minify({ ext: { src: '-debug.js', min: '.js' }, ignoreFiles: ['-min.js'] }))
			.pipe(sourcemaps.write())
			.pipe(dest('./dist/js'))
			.pipe(browserSync.stream())
	)
}

// 4. Image - optimize
function imageTask() {
	return src('./src/images/**/*')
		.pipe(
			imagemin([
				pngquant({
					quality: [0.3, 0.5], // [minimum, maximum]
				}),
				mozjpeg({
					quality: 40,
				}),
			])
		)
		.pipe(dest('./dist/images'))
		.pipe(browserSync.stream())
}

// 5. Copy files - favicones, vendor etc
function copyTask() {
	return src('./src/favicons/*').pipe(dest('./dist/favicons/')), src('./src/vendor/*').pipe(dest('./dist/vendor/'))
}

// 6. HTML - include
function fileincludeTask() {
	return src(['./src/*.html'])
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file',
			})
		)
		.pipe(dest('./dist/'))
}

// 7. Watch - image, css, js, html
function watchTask() {
	browserSync.init({
		server: {
			baseDir: './dist/', //Destination folder
		},
	})
	watch('./src/images/**/*', imageTask)
	watch('./src/scss/**/*.scss', cssTask)
	watch('./src/js/*.js', jsTask)
	watch('./src/**/*.html', fileincludeTask).on('change', browserSync.reload)
	// watch('./dist/*.html').on('change', browserSync.reload)
}

// Export each task  -- To start task, "gulp TASKNAME"
exports.clean = cleanTask //ig. "gulp clean"
exports.image = imageTask
exports.css = cssTask
exports.js = jsTask
exports.copy = copyTask
exports.watch = watchTask

// Default task
exports.default = series(cleanTask, parallel(imageTask, cssTask, jsTask), copyTask, fileincludeTask, watchTask)
