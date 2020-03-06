// const gulp = require('gulp');
const { src, dest, task, watch, series, parallel } = require('gulp') //When use this line instead of above line, change method without [gulp.] ex. gulp.dest => dest
const sass = require('gulp-sass')
// const concat = require('gulp-concat');
const minify = require('gulp-minify')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')
// const babel = require('gulp-babel')

// CSS bundle, minify task
function cssTask() {
  return (
    src('./src/scss/app.scss')
      .pipe(sass().on('error', sass.logError))
      // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(dest('./dest/css'))
      .pipe(browserSync.stream())
  )
}

// JS Babel & minify task
function jsTask() {
  return (
    src('./src/js/**/*.js')
    // .pipe(concat('app.js'))
    .pipe(babel({presets: ['@babel/preset-env'],}))
    .pipe(minify({ext: {min: '.js'},ignoreFiles: ['-min.js']}))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream())
  )
}

// Image minify task
function imageTask() {
  return src('./src/images/*')
    .pipe(
      imagemin([
        pngquant({
          quality: [0.3, 0.5] // [minimum, maximum]
        }),
        mozjpeg({
          quality: 40
        })
      ])
    )
    .pipe(dest('./dist/images/'))
}

// Reload function
function reloadBrowser(done) {
	browserSync.reload()
	done()
}

// Watch task
function watchTask() {
	browserSync.init({
		server: {
			baseDir: './dist/', //Destination folder
		},
	})
  watch('./src/scss/**/*.scss', cssTask)
  watch('./src/js/*.js', jsTask)
  watch('./dist/*.html').on('change', reloadBrowser)
  // watch('./src/images/*', imagemin); //Use when needed
  // watch('./dest/js/*.js').on('change', reloadBrowser); //Use when change js files directly
}

// Export tasks
exports.image = imageTask
exports.style = cssTask
exports.js = jsTask
exports.watch = watchTask

// Default task
exports.default = series(parallel(cssTask, jsTask), watchTask)