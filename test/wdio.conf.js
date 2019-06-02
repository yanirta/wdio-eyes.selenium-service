const ApplitoolsEyes = require('../index.js');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    applitools: {
        //disable: false,
        //serverUrl: "",
        apiKey: process.env.APPLITOOLS_API_KEY,
        appName: "Test-App",
        batchName: "Test-Batch",
        useEyesWDIO: true,
        debug: true,
        //sendDom: true,
        //disableCSSScrolling: true, 
        logfile: true,
        //disableAbort: true
        viewport: { width: 1200, height: 650 }
        //viewport: { width: 500, height: 650 }
        //displayScrollbars: true
    },

    host: '127.0.0.1',
    port: 4444,
    path: '/wd/hub',
    maxInstances: 10,

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
    //bail: 0,
    //screenshotPath: './errorShots/',
    baseUrl: 'https://applitools.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone', ApplitoolsEyes],//
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd'
    },

    // debug: true,
    // execArgv: ['--inspect-brk=127.0.0.1:5859'],
}
