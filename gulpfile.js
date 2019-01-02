let gulp = require("gulp");

let sass = require("gulp-sass");

let server = require("gulp-webserver");

let concat = require("gulp-concat");

let uglify = require("gulp-uglify");

let babel = require("gulp-babel");

let bCss = require("gulp-clean-css");


//编译scss
gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

//监听scss
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"));
})