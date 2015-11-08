/*global -$ */
'use strict';
// generated on 2015-11-07 using generator-modern-frontend 0.2.3
var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var through2 = require('through2');
var browserify = require('browserify');

var historyApiFallback = require('connect-history-api-fallback')

var isDevelopment = (process.env.RAILS_ENV !== "production")

gulp.task('stylesheet', ['sprites'], function () {
  return gulp.src('app/css/main.styl')
    .pipe($.if(!isDevelopment, $.sourcemaps.init()))
    .pipe($.stylus({
      import: ['sprites/*'], // auto-import sprite files
      errors: true
    }))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.if(!isDevelopment, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({stream: true}));
});

gulp.task('sprites', function() {
  var spritesPath = 'app/images/sprites';
  var identifiers = fs.readdirSync(spritesPath).filter(function(spritePath) {
    var stat = fs.statSync(spritesPath + '/' + spritePath);
    return stat.isDirectory();
  });

  for (var i = 0; i < identifiers.length; i++) {
    var spriteData = gulp.src(spritesPath + '/' + identifiers[i] + '/*.png').pipe($.spritesmith({
      imgName: 'sprite_' + identifiers[i] + '.png',
      cssName: identifiers[i] + '.styl',
      imgPath: '../images/sprite_' + identifiers[i] + '.png',
      cssFormat: 'stylus'
    }));

    // Pipe image stream
    spriteData.img
      .pipe(gulp.dest('.tmp/images'))
      .pipe(gulp.dest('../public/images'))

    // Pipe CSS stream
    spriteData.css
      .pipe(gulp.dest('app/css/sprites'));
  }
});

gulp.task('javascript', function () {
  return gulp.src('app/js/main.js')
    .pipe(through2.obj(function (file, enc, next){ // workaround for https://github.com/babel/babelify/issues/46
      browserify({
        entries: file.path,
        debug: isDevelopment
      }).bundle(function(err, res){
        if (err) { return next(err); }

        file.contents = res;
        next(null, file);
      });
    }))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(gulp.dest('../public/js'))
    .pipe($.if(!isDevelopment, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(!isDevelopment, $.uglify()))
    .pipe($.if(!isDevelopment, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/js'));
});

gulp.task('jshint', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['stylesheet'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app/*.html', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('../public'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('../public/images'));
});

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('../public/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('../public'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', '../public']));

gulp.task('serve', ['stylesheet', 'javascript', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: [ historyApiFallback() ]
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/js/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(['app/css/**/*.styl', '!app/css/sprites/*.styl'], ['stylesheet']);
  gulp.watch('app/js/**/*', ['javascript']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/css/*.styl')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/css'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      // exclude: ['bootstrap-sass-official'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['javascript', 'stylesheet', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('../public/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
