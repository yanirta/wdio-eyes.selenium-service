'use strict';
var EyesBase = require('./eyesBase');
var Target = require('./targetWDIO');
var EyesPackage = require('@applitools/eyes.webdriverio');
var FileLogHandler = require('@applitools/eyes-common').FileLogHandler;
class eyesWDIO extends EyesBase {
    constructor(config) {       
        super(EyesPackage, config, Target, EyesPackage.WebdriverioCheckSettings, EyesPackage.By);
        if (this.config.disableCSSScrolling !== true)
            this.eyes.setStitchMode(EyesPackage.StitchMode.CSS);
        if(this.config.logfile === true)
            this.eyes.setLogHandler(new FileLogHandler());
        this.logDebug("Stitch mode: " + this.eyes._configuration.getStitchMode());
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
            this.eyes.setSendDom(this.config.sendDom === true); //default to false
            await this.eyes.open(browser, appName, testName, viewport);
        });
    }
}

module.exports = eyesWDIO;