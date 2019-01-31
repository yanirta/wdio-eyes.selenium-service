'use strict';
const VERSION = require('../package.json').version;
var Eyes, Target, By, CheckSettings;

class EyesBase {
    constructor(EyesPackage, config, trgobj, chStngs, byobj) {
        Eyes = EyesPackage.Eyes;
        Target = trgobj;
        By = byobj;
        CheckSettings = chStngs;
        this.config = config;
        this.debug = false;
        this.usesOfficialEyesWDIO = false;
        this.eyes = new Eyes();
        this.eyes._getBaseAgentId = () => { return 'wdio-eyes.selenium-service/' + VERSION + '(on ' + Eyes.prototype._getBaseAgentId() + ')'; };
        this.eyes.setApiKey(this.config.apiKey);
        if (this.config.disable && this.config.disable == true)
            this.eyes.setIsDisabled(true);
        if (this.config.batchName)
            this.eyes.setBatch(this.config.batchName, process.env.BATCH_ID);
        if (this.config.globalMatchLevel)
            this.eyes.setMatchLevel(this.config.globalMatchLevel);
        if (this.config.disableCSSScrolling != true)
            if (EyesPackage.StitchMode)
                this.eyes.setStitchMode(EyesPackage.StitchMode.CSS);
            else
                this.eyes.setStitchMode(Eyes.StitchMode.CSS);
        if (this.config.disableFullPageScreenshot != true)
            this.eyes.setForceFullPageScreenshot(true);
        if (this.config.serverUrl)
            this.eyes.setServerUrl(this.config.serverUrl);
        if (this.config.debug && this.config.debug == true)
            this.debug = true;
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
            this.logDebug('Validating eyes');
            return this.eyes.checkWindow(tag);
        });
        
        browser.addCommand('eyesClose', (throwEx) => {
            var that = this;
            that.logDebug('Closing eyes');
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
            this.logDebug('Validating eyes');
            //target = this.redress(target);
            return this.eyes.check(tag, target);
        });
    }
    afterTest(test) {
        if (!this.config.disableAbort)
            return this.eyes.abortIfNotClosed();
    }

    logDebug(message) {
        if (this.debug && this.debug == true)
            console.log(message);
    }

    getTarget() { return Target; }

    // redress(targetelem) {
    //     if (!(targetelem instanceof CheckSettings))
    //         targetelem = Target.region(targetelem); //Best effort
    //     else if ((targetelem.getRegion) && (typeof targetelem.getRegion().eyesOpen == "function")) //This is wdio elem
    //         targetelem._region = By.css(targetelem.getRegion().selector);
    //     return targetelem;
    // }
}

module.exports = EyesBase;