const ApplitoolsEyes = require('../index.js');
exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    applitools: {
        //disable: true,
        apiKey: process.env.APPLITOOLS_API_KEY,
        appName: "AppNameByConfig",
        batchName: "My First Applitools WDIO Batch",
        debug: true,
        useEyesWDIO: true
    },

    host: '127.0.0.1',
    port: 4444,
    path: '/wd/hub',
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        browserName: 'chrome'
    },
        // {
        //     browserName: 'chrome'
        // }
    ],
    sync: true,
    logLevel: 'verbose',
    coloredLogs: true,
    deprecationWarnings: true,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'https://applitools.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone', ApplitoolsEyes],//
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd'
    }
}
