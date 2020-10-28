# Simple boilerplate with Sass using gulp 4

A simple boilerplate with Sass using <a href="https://gulpjs.com/">gulp</a>. Made for static website projects which are not available to use modern frameworks. For example, small companies' websites, WordPress templates, etc.

### Install

```
npm install --save-dev gulp gulp-sass browser-sync gulp-imagemin gulp-autoprefixer imagemin-mozjpeg imagemin-pngquant gulp-minify gulp-concat gulp-babel @babel/core @babel/preset-env babel-polyfill gulp-file-include del
```

### Default

Run all tasks to develop the project

`gulp`

### Each tasks

- Clean `gulp clean`
- CSS bundle, minify task `gulp css`
- HTML `gulp html`
- JS Babel & minify task `gulp js`
- Image minify task `gulp image`
- File include `gulp fileinclude`
- Watch above `gulp watch`

### Change History

0.0.3 (Oct 2020) - Organize file structure<br/>0.0.2 (Sep 2020) - Fix gulpfile.js bug, update scss structure and names<br/> 0.0.1 (Aug 2020) - Initial commit
