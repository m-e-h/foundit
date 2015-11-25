/**
 * MEH gulp
 */

//'use strict';

import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;



const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var FOUNDATION = [
  'assets/src/foundation/js/foundation.core.js',
  'assets/src/foundation/js/foundation.util.box.js',
  'assets/src/foundation/js/foundation.util.keyboard.js',
  'assets/src/foundation/js/foundation.util.mediaQuery.js',
  'assets/src/foundation/js/foundation.util.motion.js',
  'assets/src/foundation/js/foundation.util.nest.js',
  'assets/src/foundation/js/foundation.util.timerAndImageLoader.js',
  'assets/src/foundation/js/foundation.util.touch.js',
  'assets/src/foundation/js/foundation.util.triggers.js',
  'assets/src/foundation/js/foundation.abide.js',
  'assets/src/foundation/js/foundation.accordion.js',
  'assets/src/foundation/js/foundation.accordionMenu.js',
  'assets/src/foundation/js/foundation.drilldown.js',
  'assets/src/foundation/js/foundation.dropdown.js',
  'assets/src/foundation/js/foundation.dropdownMenu.js',
  'assets/src/foundation/js/foundation.equalizer.js',
  'assets/src/foundation/js/foundation.interchange.js',
  'assets/src/foundation/js/foundation.magellan.js',
  'assets/src/foundation/js/foundation.offcanvas.js',
  'assets/src/foundation/js/foundation.orbit.js',
  'assets/src/foundation/js/foundation.responsiveMenu.js',
  'assets/src/foundation/js/foundation.responsiveToggle.js',
  'assets/src/foundation/js/foundation.reveal.js',
  'assets/src/foundation/js/foundation.slider.js',
  'assets/src/foundation/js/foundation.sticky.js',
  'assets/src/foundation/js/foundation.tabs.js',
  'assets/src/foundation/js/foundation.toggler.js',
  'assets/src/foundation/js/foundation.tooltip.js',
];

const SOURCESJS = [
  // ** Mine ** //
  'assets/src/scripts/main.js',
];

// ***** Development tasks ****** //
// Lint JavaScript
gulp.task('lint', () =>
  gulp.src('assets/src/scripts/*.js')
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

// ***** Production build tasks ****** //
// Optimize images
gulp.task('images', () =>
  gulp.src('assets/src/images/**/*.{svg,png,jpg}')
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('assets/images'))
  .pipe($.size({
    title: 'images'
  }))
);

// Compile and Automatically Prefix Stylesheets (production)
gulp.task('styles', () => {
  // For best performance, don't add Sass partials to `gulp.src`
  gulp.src('assets/src/style.scss')
    // Generate Source Maps
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    //.pipe($.cssInlineImages({webRoot: 'src'}))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    // Concatenate Styles
    .pipe($.concat('style.css'))
    //.pipe($.csscomb())
    .pipe(gulp.dest('./'))
    // Minify Styles
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.concat('style.min.css'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
    .pipe($.size({
      title: 'styles'
    }));
});

// Concatenate And Minify JavaScript
gulp.task('scripts', () =>
  gulp.src(SOURCESJS)
  .pipe($.sourcemaps.init())
  .pipe($.babel())
  .pipe($.sourcemaps.write())
  // Concatenate Scripts
  .pipe($.concat('foundit.js'))
  .pipe(gulp.dest('assets/js'))
  // Minify Scripts
  .pipe($.uglify({
    sourceRoot: '.',
    sourceMapIncludeSources: true
  }))
  .pipe($.concat('foundit.min.js'))
  // Write Source Maps
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('assets/js'))
  .pipe($.size({
    title: 'scripts'
  }))
);

// Concatenate And Minify JavaScript
gulp.task('foundation_js', () =>
  gulp.src(FOUNDATION)
  .pipe($.sourcemaps.init())
  //.pipe($.babel())
  .pipe($.sourcemaps.write())
  // Concatenate Scripts
  .pipe($.concat('foundation.js'))
  .pipe(gulp.dest('assets/js'))
  // Minify Scripts
  .pipe($.uglify({
    sourceRoot: '.',
    sourceMapIncludeSources: true
  }))
  .pipe($.concat('foundation.min.js'))
  // Write Source Maps
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('assets/js'))
  .pipe($.size({
    title: 'foundation_js'
  }))
);

/**
 * Defines the list of resources to watch for changes.
 */
// Build and serve the output
gulp.task('serve', ['scripts', 'styles'], () => {
  browserSync.init({
    //proxy: "local.wordpress.dev"
    //proxy: "local.wordpress-trunk.dev"
    //proxy: "doc.dev"
    proxy: "dev.dev"
      //proxy: "127.0.0.1:8080/wordpress/"
  });

  gulp.watch(['*/**/*.php'], reload);
  gulp.watch(['src/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/**/*.js'], ['lint', 'scripts']);
  gulp.watch(['assets/src/images/**/*'], reload);
});

// Build production files, the default task
gulp.task('default', cb => {
  runSequence(
    'styles', [/*'lint',*/ 'scripts', 'foundation_js', 'images'],
    cb);
});
