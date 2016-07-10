var gulp = require("gulp");
var ngAnnotate = require("gulp-ng-annotate");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var es = require("event-stream");
var runSequence = require("run-sequence");
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css");
var webserver = require("gulp-server-livereload");
var flatten = require("gulp-flatten");

var dist = "dist/";
var js = dist + "js";
var css = dist + "css";
var html = dist + "html";
var jsLib = dist + "lib/js";
var cssLib = dist + "lib/css";
var fontLib = dist + "lib/fonts";
var langs = dist + "langs";

var libPath = "bower_components/";

var jsLibraries = ["angular/angular.min.js",
    "angular-animate/angular-animate.min.js",
    "angular-aria/angular-aria.min.js",
    "angular-bootstrap/ui-bootstrap-tpls.min.js",
    "angular-cookies/angular-cookies.min.js",
    "angular-dynamic-locale/dist/tmhDynamicLocale.min.js",
    "angular-material/angular-material.min.js",
    "angular-recaptcha/release/angular-recaptcha.min.js",
    "angular-resource/angular-resource.min.js",
    "angular-route/angular-route.min.js",
    "angular-sanitize/angular-sanitize.min.js",
    "angular-translate/angular-translate.min.js",
    "angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
    "angular-translate-storage-cookie/angular-translate-storage-cookie.min.js",
    "angular-translate-storage-local/angular-translate-storage-local.min.js",
    "angular-ui-router/release/angular-ui-router.min.js"
];

var cssLibraries = ["bootstrap/dist/css/bootstrap.min.css",
    "angular-material/angular-material.min.css"
];

var fontLibraries = ["bootstrap/dist/fonts/*"]

gulp.task("myScripts", function() {
    var jsStream = gulp.src(["src/**/*.js", "!src/languages/locals/*.js"]);

    function errorHandler(error) {
        console.log(error.message);

        this.emit("end");
    }

    return es.merge(jsStream)
        .pipe(concat("app.min.js"))
        .pipe(ngAnnotate())
        .on("error", errorHandler)
        // .pipe(uglify())
        .pipe(gulp.dest(js));
});

gulp.task("myStyles", function() {
    var lessStream = gulp.src("src/**/*.less")
        .pipe(less());

    var cssStream = gulp.src("src/**/*.css");

    return es.merge(lessStream, cssStream)
        .pipe(concat("app.min.css"))
        // .pipe(cleanCss())
        .pipe(gulp.dest(css));
});

gulp.task("myViews", function() {
    var indexStream = gulp.src("src/index.html");

    indexStream.pipe(gulp.dest(dist));

    var htmlStream = gulp.src(["src/**/*.html", "!src/index.html"]);

    return htmlStream
        .pipe(flatten())
        .pipe(gulp.dest(html));
});

gulp.task("libScripts", function() {
    jsLibraries = jsLibraries.map(function(lib) {
        return libPath + lib;
    });
    var jsLibStream = gulp.src(jsLibraries);

    return jsLibStream
        .pipe(concat("js.min.js"))
        // .pipe(uglify())
        .pipe(gulp.dest(jsLib));
});

gulp.task("libStyles", function() {
    cssLibraries = cssLibraries.map(function(lib) {
        return libPath + lib;
    });

    var cssLibStream = gulp.src(cssLibraries);

    return cssLibStream
        .pipe(concat("css.min.css"))
        // .pipe(cleanCss())
        .pipe(gulp.dest(cssLib));
});

gulp.task("libFonts", function() {
    fontLibraries = fontLibraries.map(function(lib) {
        return libPath + lib;
    });

    var fontLibStream = gulp.src(fontLibraries);

    return fontLibStream
        .pipe(gulp.dest(fontLib))
});

gulp.task("langs", function() {
    var langsStream = gulp.src("src/languages/**");

    return langsStream
        .pipe(gulp.dest(langs));
});

gulp.task("webserver", function() {
    return gulp.src(dist)
        .pipe(webserver({
            host: "0.0.0.0",
            livereload: true,
            fallback: "index.html",
            open: false
        }));
})

gulp.task("watcher", function() {
    gulp.watch("src/**/*.js", ["myScripts"])
    gulp.watch("src/**/*.{less, css}", ["myStyles"])
    gulp.watch("src/**/*.html", ["myViews"]);
});

gulp.task("default", function() {
    return runSequence("libScripts", "libStyles", "libFonts",
        "myScripts", "myStyles", "myViews", "langs", "watcher", "webserver");
})
