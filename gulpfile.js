const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');


gulp.task('svg-generator', () => {
    return gulp.src('./svgs/**/*.svg')
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('./src/assets/svg'));
})