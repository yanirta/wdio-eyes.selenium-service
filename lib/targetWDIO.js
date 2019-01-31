const Target = require('@applitools/eyes.webdriverio').Target;
const By = require('@applitools/eyes.webdriverio').By;
class TargetWDIO extends Target {
    static region(targelem, frame) {
        if (typeof targelem.eyesOpen == "function" || targelem.selector)  //This is wdio elem
            targelem = By.cssSelector(targelem.selector);
        return Target.region(targelem, frame);
    }
}

module.exports = TargetWDIO;