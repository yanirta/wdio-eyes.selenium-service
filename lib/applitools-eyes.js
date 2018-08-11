var Eyes = require('eyes.selenium').Eyes;
var webdriver = require('selenium-webdriver');
var http = require('selenium-webdriver/http');
var VERSION = require('../package.json').version;

class ApplitoolsEyes {
    constructor() {
        this.eyes = new Eyes();
        this.eyes._getBaseAgentId = function () {
            return 'wdio-eyes.selenium-service/' + VERSION + '(on ' + Eyes.prototype._getBaseAgentId()+')';
        };
    }
    beforeSession (config, caps) {
        this.config = config.applitools;

        this.eyes.setApiKey(this.config.apiKey);
        if (this.config.batchName)
            this.eyes.setBatch(this.config.batchName, process.env.BATCH_ID);
        if(this.config.globalMatchLevel)
            this.eyes.setMatchLevel(this.config.globalMatchLevel);
        if(this.config.disableCSSScrolling!=true)
            this.eyes.setStitchMode(Eyes.StitchMode.CSS);
        if(this.config.disableFullPageScreenshot!=true)
            this.eyes.setForceFullPageScreenshot(true);
        if(this.config.serverUrl)
            this.eyes.setServerUrl(this.config.serverUrl);
    }
    
    before (caps) {
        var opt = browser.options;
        var serverUrl = opt.protocol + '://' + opt.hostname + ':' + opt.port + '/wd/hub';
        this.driver = this.create_webdriver(serverUrl, browser.sessionId);
        
        browser.addCommand("eyesOpen", async (testName) => {
            console.log("Opening eyes");
            var appName = this.config.appName || "WDIO App";
            var viewport = this.config.viewport;
            await this.eyes.open(this.driver, appName, testName, viewport);
        });

        browser.addCommand("eyesCheckWindow", (tag) => {
            console.log("Validating eyes");
            return this.eyes.checkWindow(tag);
        });

        browser.addCommand("eyesCheck", (tag, target)=>{
            console.log("Validating eyes");
            return this.eyes.check(tag, target);
        });

        browser.addCommand("eyesClose", (throwEx) => {
            console.log("Closing eyes");
            return this.eyes.close(throwEx).then(function (res) {
                console.log(">> Test Result <<");
                console.log(res);
                console.log(res.appUrls.session);
            });
        });
    }
    beforeSuite (suite) {

    }
    beforeFeature (feature) {}
    beforeTest (test) {}
    beforeStep (step) {}

    async afterTest (test) {
        if(!this.config.disableAbort)
            return this.eyes.abortIfNotClosed();
    }

    create_webdriver(server_url, session_id) {
        var commandExecutor = new http.Executor(new http.HttpClient(server_url));
        return webdriver.WebDriver.attachToSession(commandExecutor, session_id);
    }
}

module.exports = ApplitoolsEyes;
