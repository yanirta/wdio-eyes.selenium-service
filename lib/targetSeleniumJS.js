const Target = require('eyes.selenium').Target;
const MatchLevel = require('eyes.selenium').MatchSettings.MatchLevel;
const By = require('selenium-webdriver').By;

class TargetSeleniumJS extends Target {
    constructor(region, frame) {
        super(region, frame);
    }

    static region(targelem, frame) {
        if (typeof targelem.eyesOpen == "function" || targelem.selector)  //This is wdio elem
            targelem = By.css(targelem.selector);

        return new TargetSeleniumJS(targelem, frame);
    }

    layout() {
        return super.matchLevel(MatchLevel.Layout);
    }

    strict() {
        return super.matchLevel(MatchLevel.Strict);
    }

    content() {
        return super.matchLevel(MatchLevel.Content);
    }
}

module.exports = TargetSeleniumJS;