'use strict';

var del = require('del');
var gulp = require('gulp');
var open = require('open');
var wiredep = require('wiredep').stream;
var argv = require('yargs').argv;
var Karma = require('karma').Server;
var htmlMinOptions = require('./gulp/htmlMin.json');
var env = require('./gulp/env.json');

var $ = require('gulp-load-plugins')();

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('serve', ['dist', 'test'], launchServe);

gulp.task('serve-dev', ['test', 'dependencies:app'], launchServe);

function launchServe() {
    var profile = (argv.env !== undefined) ? argv.env : 'dev';
    if (env[profile] == undefined) {
        var possibleEnvs = "";
        for (var possibleEnv in env) {
            possibleEnvs += possibleEnv + ",";
        }
        throw new Error("--env argument must be one of: " + possibleEnvs.substring(0, possibleEnvs.length - 1));
    }

    if (env[profile].backend.stubby) {
        /* Start Stubby Server */
        var options = {
            stubs: env[profile].backend.port,
            admin: env[profile].backend.adminPort,
            files: [
                'stub/*.yaml'
            ]
        };
        /* Stubby is launched on localhost */
        env[profile].backend.address = "localhost";

        /* Start the stubby server, asynchronously */
        $.stubbyServer(options, function () {
        });
    }

    $.connect.server({
        root      : [env[profile].rootdir],
        port      : env[profile].port,
        livereload: env[profile].livereload
    });
    open('http://localhost:' + env[profile].port);

    gulp.watch([
        env[profile].rootdir + '/*.{html,css,js,json}',
        env[profile].rootdir + '/!(bower_components)/**/*.{html,css,js}'
    ], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });
}

gulp.task('dependencies:app', ['clean'], function () {
    var injectOptions = {
        addRootSlash: false,
        relative    : true
    };

    return gulp.src(['app/index.html'])
        .pipe(wiredep({}))
        .pipe($.inject(gulp.src(['app/*.js', 'app/**/*.js', '!app/bower_components/**/*'], {read: false}), injectOptions))
        .pipe($.inject(gulp.src(['app/**/*.css', '!app/bower_components/**/*'], {read: false}), injectOptions))
        .pipe(gulp.dest('app'));
});

gulp.task('dependencies:test', ['clean'], function () {
    var injectOptions = {
        addRootSlash: false,
        relative    : true,
        starttag    : "// inject:js",
        endtag      : "// endinject",
        transform   : function (filepath, file, i, length) {
            return '\'' + filepath.replace("../app/", "") + '\',';
        }
    };
    var injectOptionsTest = {
        addRootSlash: false,
        relative    : true,
        starttag    : "// inject:spec.js",
        endtag      : "// endinject",
        transform   : function (filepath, file, i, length) {
            return '\'' + filepath.replace("spec/", "../test/spec/") + '\'' + (i + 1 < length ? ',' : '');
        }
    };

    return gulp.src([
        'test/karma.conf.js'
    ])
        .pipe(wiredep({
            devDependencies: true,
            fileTypes      : {
                js: {
                    replace: {
                        js: function (filePath) {
                            /* Removing ../app from karma generated dependencies */
                            return "'" + filePath.substring(7, filePath.length) + "',";
                        }
                    }
                }
            }
        }))
        .pipe($.inject(gulp.src(['test/spec/**/*.js'], {read: false}), injectOptionsTest))
        .pipe($.inject(gulp.src(['app/**/*.js', '!app/bower_components/**/*', 'app.js'], {read: false}), injectOptions))
        .pipe(gulp.dest('test'));
});

gulp.task('dependencies', ['dependencies:app', 'dependencies:test']);

gulp.task('copy:app', ['dependencies'], function () {
    return gulp.src([
        'app/index.html',
        'app/.htaccess',
        'app/favicon.ico',
        'app/robots.txt'
    ]).pipe(gulp.dest('dist'));
});

gulp.task('copy:images', ['clean'], function () {
    return gulp.src([
        'app/**/*.{ico,png,jpg,svg}'
    ])
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use        : []
        }))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copy:fonts', ['clean'], function () {
    return gulp.src([
        'app/**/*.{eot,woff,ttf,woff2}'
    ])
        .pipe($.flatten())
        .pipe(gulp.dest('dist/font/roboto'));
});

gulp.task('copy', [
    'copy:app',
    'copy:images',
    'copy:fonts',
    'test'
]);

gulp.task('minify', ['copy'], function () {
    return gulp.src('app/index.html')
        .pipe($.useref())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.if('**/*.js', $.ngAnnotate()))
        .pipe($.if('**/*.js', $.uglify({output: {ascii_only: true}})))
        .pipe($.if('**/*.js', $.stripDebug()))
        .pipe($.if('**/*.css', $.csso()))
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe($.if('**/*.html', $.htmlmin(htmlMinOptions)))
        .pipe($.size({showFiles: true}))
        .pipe($.sourcemaps.write('.', {debug: true, sourceRoot: '.'}))
        .pipe(gulp.dest('dist'))
        .on('error', $.util.log);
});

gulp.task('template', ['minify'], function () {
    return gulp.src([
        'app/**/*.tpl.html'
    ])
        .pipe($.filter('!bower_components/**'))
        .pipe($.angularTemplatecache({module: 'templates', root: ''}))
        .pipe(gulp.dest('dist/scripts'))
        .on('error', $.util.log);
});

gulp.task('dist', ['template'], function () {

    return gulp.src([
        'dist/**/*.js',
        'dist/**/*.css',
        'dist/**/*.html'
    ]).pipe($.manifest({
        hash    : true,
        filename: 'app.manifest',
        exclude : 'app.manifest'
    }))
    .pipe(gulp.dest('dist'))
    .pipe($.notify({message: 'Dist task complete'}))
    .on('error', $.util.log);
});

gulp.task('test', ["dependencies:test"], function (done) {
    if (!argv.skipTest) {
        new Karma({
            configFile: __dirname + '/test/karma.conf.js',
            singleRun : (argv.watch === undefined)
        }, function (karmaExitStatus) {
            if (karmaExitStatus) {
                process.exit(1);
            } else {
                done();
            }
        }).start();
    } else {
        $.util.log(" Skipping tests is NOT a good idea. ");
        done();
    }
});

gulp.task('default', ['zip']);

gulp.task('zip', ['dist'], function () {
    return gulp.src([
        'dist/**/*',
        '!dist/**/*.map'
    ])
        .pipe($.zip('cloud-sample-app.zip'))
        .pipe(gulp.dest('.'));
});
