// Karma configuration
// Generated on Fri Jan 20 2017 13:08:37 GMT+0100 (CET)

var path = require('path');


module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'resources/assets/js/lib/pictureGame/__tests__/**/*.spec.js', watched: false}
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "resources/assets/js/lib/pictureGame/__tests__/**/*.spec.js": ["webpack", "sourcemap"],
            "resources/assets/js/lib/pictureGame/**/*.js": ["webpack", "sourcemap"]
        },

        coverageReporter: {
            includeAllSources: true,
            type : 'html',
            dir : path.join(__dirname, "resources/assets/js/lib/pictureGame/__tests__/coverage/")
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["progress", "junit", "coverage", "kjhtml"],

        junitReporter: {
            outputDir: path.join(__dirname, "resources/assets/js/lib/pictureGame/__tests__/reporter"), // results will be saved as $outputDir/$browserName.xml
            outputFile: "report.xml", // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: "", // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {} // key value pair of properties to add to the <properties> section of the report
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
      },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        webpack: {
            // you don't need to specify the entry option because
            // karma watches the test entry points
            // webpack watches dependencies

            // ... remainder of webpack configuration (or import)
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: ['babel'],
                    include: path.join(__dirname, 'resources/assets/js/lib/pictureGame'),
                    query: {
                            presets: ["es2015", "react"],
                            plugins: [
                                "transform-object-rest-spread",
                                // babel-plugin-istanbul handles coverage directly
                                // during the transpilation, we do not use karma's preprocessor
                                ["istanbul", {
                                    // istanbul doesn't include files outside cwd
                                    // so we give it the root of the app
                                    cwd: path.join(__dirname, "resources/assets/js/lib/pictureGame"),
                                    // do not instrument spec files
                                    exclude: ["__tests__/**/*"]
                                }]
                            ]
                        }
                }]
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e.
                chunks: false
            }
        },

        plugins: [
            "karma-webpack",
            "karma-jasmine",
            "karma-chrome-launcher",
            "karma-sourcemap-loader",
            "karma-phantomjs-launcher",
            "karma-junit-reporter",
            "karma-jasmine-html-reporter",
            "karma-coverage"
        ]
    })
}
