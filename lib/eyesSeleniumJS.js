'use strict';

const EyesBase = require('./eyesBase');
const http = require('selenium-webdriver/http');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const EyesPackage = require('eyes.selenium');
const Target = require('./targetSeleniumJS');

class EyesSeleniumJS extends EyesBase {
    constructor(config) {
        super(EyesPackage, config, Target, Target, By);
        if(this.config.logfile === true)
            this.eyes.setLogHandler(new FileLogHandler());
        if (this.config.disableCSSScrolling !== true)
            this.eyes.setStitchMode(Eyes.StitchMode.CSS);
        this.logDebug("Stitch mode: " + this.eyes.getStitchMode());
    }

    onReload(caps) {
        return this.load_webdriver();
    }

    before(browser, caps) {
        this.load_webdriver();
        super.before(browser, caps);

        browser.addCommand('eyesClearTags', () => {
            this.eyes._properties = [];
            return browser;
        });

        browser.addCommand('eyesOpen', async (testName) => {
            this.logDebug('Opening eyes');
            var appName = this.config.appName || 'WDIO App';
            var viewport = this.config.viewport;
            await this.eyes.open(this.driver, appName, testName, viewport);
        });
    }

    getTarget() {
        return Target;
    }

    load_webdriver() {
        if (!this.config.useOfficialEyesWDIO) {
            var opt = browser.options;
            var serverUrl = opt.protocol + '://' + opt.hostname + ':' + opt.port + '/wd/hub';
            this.driver = this.create_webdriver(serverUrl, browser.sessionId);
        }
    };

    create_webdriver(server_url, session_id) {
        var commandExecutor = new http.Executor(new http.HttpClient(server_url));
        return webdriver.WebDriver.attachToSession(commandExecutor, session_id);
    }
}

module.exports = EyesSeleniumJS;