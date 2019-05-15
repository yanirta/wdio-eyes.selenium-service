'use strict';
const VERSION = require('../package.json').version;
var Eyes, Target, By, CheckSettings, StitchMode, FileLogHandler;

class EyesBase {
    constructor(EyesPackage, config, trgobj, chStngs, byobj) {
        Eyes = EyesPackage.Eyes;
        Target = trgobj;
        By = byobj;
        CheckSettings = chStngs;
        FileLogHandler = EyesPackage.FileLogHandler;
        this.config = config;
        this.debug = (this.config.debug === true);;
        this.eyes = new Eyes();
        this.eyes._getBaseAgentId = () => { return 'wdio-eyes.selenium-service/' + VERSION + '(on ' + Eyes.prototype._getBaseAgentId() + ')'; };

        if (this.config.apiKey)
            this.eyes.setApiKey(this.config.apiKey);
        if (this.config.serverUrl)
            this.eyes.setServerUrl(this.config.serverUrl);
        if (this.config.batchName)
            this.eyes.setBatch(this.config.batchName, process.env.BATCH_ID);
        if (this.config.globalMatchLevel)
            this.eyes.setMatchLevel(this.config.globalMatchLevel);

        this.eyes.setIsDisabled(this.config.disable === true);
        this.eyes.setForceFullPageScreenshot(this.config.disableFullPageScreenshot !== true);
    }

    onReload(caps) { }
    before(browser, caps) {
        browser.addCommand('eyesTag', (tagName, tagValue) => {
            return this.eyes.addProperty(tagName, tagValue);
        });

        browser.addCommand('eyesSetBatch', (name, id) => {
            id = id ? id : process.env.BATCH_ID;
            return this.eyes.setBatch(name, id);
        });

        browser.addCommand('eyesCheckWindow', (tag) => {
            this.logDebug('eyes.checkWindow(...)');
            return this.eyes.checkWindow(tag);
        });

        browser.addCommand('eyesClose', (throwEx) => {
            var that = this;
            that.logDebug('eyes.Close()');
            return this.eyes.close(throwEx).then(function (res) {
                if (res) {
                    that.logDebug('>>Visual Test Result <<');
                    that.logDebug(res);
                    if (res.appUrls)
                        that.logDebug(res.appUrls.session);
                    return res;
                }
            });
        });

        browser.addCommand('eyesCheck', (tag, target) => {
            this.logDebug('eyes.Check()');
            return this.eyes.check(tag, target);
        });
    }
    afterTest(test) {
        if (this.config.disableAbort === true)
            return this.eyes.abortIfNotClosed();
    }

    logDebug(message) {
        if (this.debug === true)
            console.log(message);
    }

    getTarget() { return Target; }
}

module.exports = EyesBase;