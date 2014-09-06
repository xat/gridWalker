var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('minimize', function() {
    return gulp.src('gridWalker.js')
        .pipe(uglify())
        .pipe(concat('gridWalker.min.js'))
        .pipe(gulp.dest(''));
});

gulp.task('default', ['minimize']);