var HelloWorldPage = require('../pageobjects/hello.world');
var Target = require('../../index').getTarget();
var MatchSettings = require('eyes.selenium').MatchSettings;

var By = require('selenium-webdriver').By;

describe('Simple cases', function () {
    this.timeout(300000);
    describe("Test native App", function () {
        it("test-function-1", function () {
            browser.eyesOpen("Hello world 1");
            browser.url('/helloworld');
            browser.eyesCheckWindow("Homepage");
            browser.click('button');
            browser.eyesCheckWindow("After click");
            browser.eyesClose(false);
        });

        it("test-function-2", function () {
            browser.eyesSetBatch("My Feature", "My Feature" + process.env.BATCH_ID);
            browser.eyesOpen("Hello world 2");
            browser.url('/helloworld');
            browser.eyesCheckWindow("Homepage");
            browser.click('button');
            browser.eyesCheckWindow("After click");
            browser.eyesClose(false);
        });

        it("test page objects regions", () => {
            browser.eyesTag("Prop1", "Val1");
            browser.eyesTag("Feature", "Feature1");
            browser.eyesOpen("Page objects tests wdio");
            HelloWorldPage.open();
            var a = Target.region(HelloWorldPage.title);
            browser.eyesCheck("title", Target.region(HelloWorldPage.title).layout());
            browser.eyesCheck("click me", Target.region(HelloWorldPage.clickMeBtn));
            browser.eyesClose(false);
            browser.eyesClearTags();
        });
    });
});