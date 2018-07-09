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
        apiKey: process.env.API_KEY,
        appName: "AppNameByConfig",
        batchName: "My First Applitools WDIO Batch",
    },

    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        platform: 'Windows 10',
        screenResolution: '1600x1200'
    },
    {
        browserName: 'firefox',
        platform: 'Windows 10',
        screenResolution: '1280x1024'
    }],
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
