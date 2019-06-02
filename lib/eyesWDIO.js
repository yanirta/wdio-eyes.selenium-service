'use strict';
var EyesBase = require('./eyesBase');
var Target = require('./targetWDIO');
const EyesPackage = require('@applitools/eyes.webdriverio');
const { FileLogHandler, RectangleSize } = require('@applitools/eyes-common');
class eyesWDIO extends EyesBase {
    constructor(config) {
        super(EyesPackage, config, Target, EyesPackage.WebdriverioCheckSettings, EyesPackage.By);
        if (this.config.disableCSSScrolling !== true)
            this.eyes.setStitchMode(EyesPackage.StitchMode.CSS);
        if (this.config.logfile === true)
            this.eyes.setLogHandler(new FileLogHandler());
        this.eyes.setSendDom(this.config.sendDom === true); //default to false
        this.logDebug("Stitch mode: " + this.eyes._configuration.getStitchMode());
    }

    before(browser, caps) {
        this.logDebug('eyesWDIO.before');
        super.before(browser, caps);
        browser.addCommand('eyesClearTags', () => {
            return this.eyes.clearProperties();
        });

        browser.addCommand('eyesOpen', async (testName) => {
            this.logDebug('Opening eyes');
            var appName = this.config.appName || 'WDIO App';
            await this.eyes.open(browser, appName, testName, this.config.viewport);
        });
    }
}

module.exports = eyesWDIO;