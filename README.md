# Simple boilerplate using gulp 4

A simple boilerplate with Sass using <a href="https://gulpjs.com/">gulp</a>. Made for static website projects which are not available to use modern frameworks. ex. small companies' websites, WordPress templates, etc.

### Package List

- <a href="https://github.com/sindresorhus/del#readme">del</a>
- <a href="https://github.com/dlmanning/gulp-sass#readme">gulp-sass</a>
- <a href="https://github.com/gulp-community/gulp-concat#readme">gulp-concat</a>
- <a href="https://github.com/hustxiaoc/gulp-minify">gulp-minify</a>
- <a href="https://github.com/sindresorhus/gulp-autoprefixer#readme">gulp-autoprefixer</a>
- <a href="https://github.com/babel/gulp-babel#readme">gulp-babel</a>
- <a href="https://github.com/BrowserSync/browser-sync">browser-sync</a>
- <a href="https://github.com/sindresorhus/gulp-imagemin#readme">gulp-imagemin</a>
- <a href="https://github.com/imagemin/imagemin-mozjpeg#readme">imagemin-mozjpeg</a>
- <a href="https://github.com/imagemin/imagemin-pngquant#readme">imagemin-pngquant</a>
- <a href="https://github.com/haoxins/gulp-file-include#readme">gulp-file-include</a>
- <a href="https://github.com/qwales1/gulp-assetpaths#readme">gulp-assetpaths</a>
- <a href="https://github.com/gulp-sourcemaps/gulp-sourcemaps">gulp-sourcemaps</a>

### Install Packages

```
npm install --save-dev gulp gulp-sass browser-sync gulp-imagemin gulp-autoprefixer imagemin-mozjpeg imagemin-pngquant gulp-minify gulp-concat gulp-babel @babel/core @babel/preset-env babel-polyfill gulp-file-include del gulp-assetpaths gulp-sourcemaps
```

### Default Run

Run all tasks to build production files `gulp`

### Run each task

- Clean `gulp clean`
- Image `gulp image`
- CSS `gulp css`
- JS `gulp js`
- Watch `gulp watch`

### Change History

0.0.4 (Dec 2020) - Add sourcemaps and assetpaths, fix favicon, update gulpfile.js<br/>0.0.3 (Oct 2020) - Organize file structure<br/>0.0.2 (Sep 2020) - Fix gulpfile.js bug, update scss structure and names<br/> 0.0.1 (Aug 2020) - Initial commit
