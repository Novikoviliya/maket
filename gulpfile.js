const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass");
const csso = require("postcss-csso");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
    return gulp.src("./source/sass/style.scss")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(),
            csso()
        ]))
        .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
    sync.init({
        server: {
            baseDir: "source"
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

exports.server = server;

// Reload

const reload = done => {
    sync.reload();
    done();
}

// Watcher

const watcher = () => {
    gulp.watch("source/sass/**/*.sass", gulp.series(styles));
    gulp.watch("source/*.html", gulp.series(html, reload));
}

// Default
exports.default = gulp.series(
    server,
    watcher
);