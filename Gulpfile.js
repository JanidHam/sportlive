var gulp       = require('gulp')  
var browserify = require('browserify')  
var babelify   = require('babelify')
var uglify     = require('gulp-uglify')
var source     = require('vinyl-source-stream')
var buffer     = require('vinyl-buffer')

gulp.task('build', function() {  
  browserify({
    entries: './assets/js/components/indexEditClient.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('editClient.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./assets/js/dist/components/'))
})

gulp.task('watch', function () {
    gulp.watch(['./assets/js/components/**/*.jsx'], ['build'])
})

gulp.task('default', ['watch'])