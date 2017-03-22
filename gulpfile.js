const gulp = require("gulp"),
    gulpsync = require("gulp-sync")(gulp)

//  Clean 
const clean = require("gulp-clean");

gulp.task("clean", () => {
    return gulp.src("build", { read: false })
        .pipe(clean({ force: true }));
});

//  Compile and uglify
const babel = require("gulp-babel"),
    uglify = require("gulp-uglify");

gulp.task("compile:js", () => {
    return gulp.src(["src/**/*.js", "!src/static/bower_components/**"])
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("build"));
});

gulp.task("compile", gulpsync.sync(["compile:js"]));

//  Copy
gulp.task("copy:html", () => {
    return gulp.src(["src/**/*.html", "!src/static/bower_components/**"])
        .pipe(gulp.dest("build"));
});

gulp.task("copy:css", () => {
    return gulp.src(["src/**/*.css", "!src/static/bower_components/**"])
        .pipe(gulp.dest("build"));
});

gulp.task("copy:imgs", () => {
    return gulp.src("src/**/*.png")
        .pipe(gulp.dest("build"));
});

gulp.task("copy:server", () => {
    return gulp.src("src/server.js")
        .pipe(gulp.dest("build"));
});

gulp.task("copy", gulpsync.sync(["copy:html", "copy:css", "copy:imgs", "copy:server"]));

//  GULP
gulp.task("default", gulpsync.sync(["compile", "copy"])); 
