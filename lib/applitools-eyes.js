var EyesSelenium = require('eyes.selenium');
var Eyes = EyesSelenium.Eyes;
var Target = EyesSelenium.Target;
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var http = require('selenium-webdriver/http');
var VERSION = require('../package.json').version;

class ApplitoolsEyes {
    constructor() {
        this.debug = false;
        this.eyes = new Eyes();
        this.eyes._getBaseAgentId = function () {
            return 'wdio-eyes.selenium-service/' + VERSION + '(on ' + Eyes.prototype._getBaseAgentId() + ')';
        };
    }
    beforeSession(config, caps) {
        this.config = config.applitools;

        this.eyes.setApiKey(this.config.apiKey);
        if (this.config.batchName)
            this.eyes.setBatch(this.config.batchName, process.env.BATCH_ID);
        if (this.config.globalMatchLevel)
            this.eyes.setMatchLevel(this.config.globalMatchLevel);
        if (this.config.disableCSSScrolling != true)
            this.eyes.setStitchMode(Eyes.StitchMode.CSS);
        if (this.config.disableFullPageScreenshot != true)
            this.eyes.setForceFullPageScreenshot(true);
        if (this.config.serverUrl)
            this.eyes.setServerUrl(this.config.serverUrl);
        if (this.config.debug)
            this.debug = true;
    }
  
    onReload(caps){
        this.load_webdriver(caps);
    }

    before(caps) {
        this.load_webdriver(caps);

        browser.addCommand('eyesOpen', async (testName) => {
            this.logDebug('Opening eyes');
            var appName = this.config.appName || 'WDIO App';
            var viewport = this.config.viewport;
            await this.eyes.open(this.driver, appName, testName, viewport);
        });

        browser.addCommand('eyesCheckWindow', (tag) => {
            this.logDebug('Validating eyes');
            return this.eyes.checkWindow(tag);
        });

        browser.addCommand('eyesCheck', (tag, target) => {
            this.logDebug('Validating eyes');
            target = this.redress(target);
            return this.eyes.check(tag, target);
        });

        browser.addCommand('eyesClose', (throwEx) => {
            this.logDebug('Closing eyes');
            return this.eyes.close(throwEx).then(function (res) {
                if (res) {
                    console.log('>>Visual Test Result <<');
                    console.log(res);
                    if (res.appUrls)
                        console.log(res.appUrls.session);
                }
            });
        });
    }
    // beforeSuite(suite) { }
    // beforeFeature(feature) { }
    // beforeTest(test) { }
    // beforeStep(step) { }

    async afterTest(test) {
        if (!this.config.disableAbort)
            return this.eyes.abortIfNotClosed();
    }

    load_webdriver(caps){
        var opt = browser.options;
        var serverUrl = opt.protocol + '://' + opt.hostname + ':' + opt.port + '/wd/hub';
        this.driver = this.create_webdriver(serverUrl, browser.sessionId);
    }

    create_webdriver(server_url, session_id) {
        var commandExecutor = new http.Executor(new http.HttpClient(server_url));
        return webdriver.WebDriver.attachToSession(commandExecutor, session_id);
    }

    logDebug(message) {
        if (this.debug && this.debug == true)
            console.log(message);
    }

    redress(targetelem) {
        if (!(targetelem instanceof Target))
            targetelem = Target.region(targetelem); //Best effort
        if (typeof targetelem.getRegion().eyesOpen == "function") //This is wdio elem
            targetelem._region = By.css(targetelem.getRegion().selector);
        return targetelem;
    }
}

module.exports = ApplitoolsEyes;
