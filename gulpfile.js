let gulp = require("gulp");

let sass = require("gulp-sass");

let server = require("gulp-webserver");

let concat = require("gulp-concat");

let uglify = require("gulp-uglify");

let babel = require("gulp-babel");

let bCss = require("gulp-clean-css");

let fs = require("fs");

let path = require("path");

let url = require("url");

//编译scss
gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(bCss())
        .pipe(gulp.dest('./src/css'));
});

//监听scss
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"));
})

//起服务
gulp.task('web', function() {
    gulp.src('src')
        .pipe(server({
            port: 6767,
            livereload: true,
            directoryListing: true,
            middleware: function(req, res, next) {
                let pathname = url.parse(req.url).pathname;
                if (pathname == "/favicon.ico") {
                    res.end("");
                    return
                } else {
                    pathname = pathname == "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }));
});


gulp.task("default", gulp.series("sass", "web", "watch"))


gulp.task("bCss", function() {
    return gulp.src("./src/css/*.css")
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("bJs", function() {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
})


gulp.task("bulid", gulp.series("bCss", "bJs"))