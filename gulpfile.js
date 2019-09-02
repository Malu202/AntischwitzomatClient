'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');



gulp.task('css', function() {
    return gulp.src('./*.scss')
    .pipe(sass({includePaths: ['./node_modules/']}).on('error', sass.logError))
    .pipe(gulp.dest('./'));
});
gulp.task('default', gulp.series(['css']));

gulp.task('watch', function() {
    gulp.watch('./*.scss', gulp.series(['css']));
});