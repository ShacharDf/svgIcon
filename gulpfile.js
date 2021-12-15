const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename')
const mergeStream = require('merge-stream');

const folders = ['grey', 'black']

gulp.task('svg-generator', () => {
    const tasks = folders.map(folder => {
        return gulp.src(`./src/assets/imgs/svg/${folder}/*.svg`)
            .pipe(svgmin())
            .pipe(svgstore())
            .pipe(rename(`${folder}.svg`))
            .pipe(gulp.dest(`./src/assets/svg/`))
    });
    return mergeStream(tasks);
})