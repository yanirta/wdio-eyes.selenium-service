'use strict';
var EyesBase = require('./eyesBase');
var Target = require('./targetWDIO');

class eyesWDIO extends EyesBase {
    constructor(config) {
        var EyesPackage = require('@applitools/eyes.webdriverio');
        super(EyesPackage, config, Target, EyesPackage.WebdriverioCheckSettings, EyesPackage.By)
    }

    before(browser, caps) {
        super.before(browser, caps);
        browser.addCommand('eyesClearTags', () => {
            return this.eyes.clearProperties();
        });

        browser.addCommand('eyesOpen', async (testName) => {
            this.logDebug('Opening eyes');
            var appName = this.config.appName || 'WDIO App';
            var viewport = this.config.viewport;
            await this.eyes.open(browser, appName, testName, viewport);
        });
    }
}

module.exports = eyesWDIO;