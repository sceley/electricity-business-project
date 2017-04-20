const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const browser = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const port = require("./server/app");
const array = ['source/css/*.css', 'source/js/*.js']
gulp.task('js', () => {
    gulp.src('source/js/*.js')
    // .pipe(babel({presets: ["es2015"]}))
    // .pipe(uglify())
    .pipe(gulp.dest('client/js'));
});
gulp.task("css", () => {
	gulp.src('source/css/*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest("client/css"));
});
// gulp.task("watch", () => {
// 	gulp.watch(array, ["css", "js"]);
// });
// gulp.task("browser", () => {
//     browserSync.init({
//         files: ['dest/css/*.css', 'server/*.html'],
//         server:{
//             baseDir: './',
//             index: "server/index.html"
//         },
//         port: port
//     });
// });
gulp.task("default", ["css", "js"]);