
class ApplitoolsEyes {
    beforeSession(config, caps) {
        if (config.applitools.useEyesWDIO === true) {
            var eyesWDIO = require('./eyesWDIO');
            this.eyes = new eyesWDIO(config.applitools);
        } else {
            var eyesSeleniumJS = require('./eyesSeleniumJS');
            this.eyes = new eyesSeleniumJS(config.applitools);
        }
    }

    onReload(caps) {
        return this.eyes.onReload(caps);
    }

    before(caps) {
        return this.eyes.before(browser, caps);
    }

    async afterTest(test) {
        return this.eyes.afterTest(test);
    }

    getTarget(){
        return this.eyes.getTarget();
    }
    // beforeSuite(suite) { }
    // beforeFeature(feature) { }
    // beforeTest(test) { }
    // beforeStep(step) { }
}


module.exports = ApplitoolsEyes;
