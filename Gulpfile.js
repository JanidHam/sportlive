var gulp = require('gulp')  
var browserify = require('browserify')  
var babelify = require('babelify')
var source = require('vinyl-source-stream')

gulp.task('build', function() {  
  browserify({
    entries: './assets/js/components/indexClientsAsists.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('clientsAsists.js'))
  .pipe(gulp.dest('./assets/js/dist/components/'))
})

gulp.task('default', ['build'])