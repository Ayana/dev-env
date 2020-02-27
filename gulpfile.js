// const gulp = require('gulp');
const { src, dest, task, watch, series, parallel } = require('gulp') //When use this line instead of above line, change method without [gulp.] ex. gulp.dest => dest
const sass = require('gulp-sass')
// const concat = require('gulp-concat');
const minify = require('gulp-minify')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant')

// CSS bundle, minify task
function cssTask() {
  return (
    src('./_src/scss/app.scss')
      // .pipe(sass().on('error', sass.logError))
      .pipe(
        sass({
          outputStyle: 'compressed'
        }).on('error', sass.logError)
      )
      .pipe(autoprefixer())
      .pipe(dest('./dest/css'))
      .pipe(browserSync.stream())
  )
}

// JS minify task
function jsTask() {
  return (
    src('./_src/js/**/*.js')
      // .pipe(concat('app.js'))
      .pipe(
        minify({
          ext: {
            min: '.js'
          },
          ignoreFiles: ['-min.js']
        })
      )
      .pipe(dest('./dest/js/'))
  )
}

// Image minify task
function imageTask() {
  return src('./_src/images/*')
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
    .pipe(dest('./dest/images/'))
}

// Watch task
function watchTask() {
  browserSync.init({
    server: {
      baseDir: './dest/' //Destination folder
    }
  })
  // watch('./_src/images/*', imagemin); //Use when needed
  watch('./_src/scss/**/*.scss', cssTask)
  watch('./_src/js/*.js', series(jsTask, browserSync.reload))
  watch('./dest/*.html').on('change', browserSync.reload)
  // watch('./dest/js/*.js').on('change', browserSync.reload); //Use when change js files directly
}

// Export tasks
exports.image = imageTask
exports.style = cssTask
exports.js = jsTask
exports.watch = watchTask

// Default task
exports.default = series(parallel(cssTask, jsTask), watchTask)
