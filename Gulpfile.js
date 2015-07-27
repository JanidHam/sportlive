var gulp       = require('gulp')  
var browserify = require('browserify')  
var babelify   = require('babelify')
var source     = require('vinyl-source-stream')

gulp.task('build', function() {  
  browserify({
    entries: './assets/js/components/indexAddClient.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('addClient.js'))
  .pipe(gulp.dest('./assets/js/dist/components/'))
})

gulp.task('watch', function () {
    gulp.watch(['./assets/js/components/**/*.jsx'], ['build'])
})

gulp.task('default', ['watch'])