var HelloWorldPage = require('../pageobjects/hello.world');
var Target = require('../../index').getTarget();
var MatchSettings = require('eyes.selenium').MatchSettings;

var By = require('selenium-webdriver').By;

describe('Simple cases', function () {
    this.timeout(300000);
    describe("Test cases", function () {
        it("Simple test case - Hello world", function () {
            browser.eyesOpen("Hello world 1");
            browser.url('/helloworld');
            browser.eyesCheckWindow("Homepage");
            browser.click('button');
            browser.eyesCheckWindow("After click");
            browser.eyesClose(false);
        });

        it("Simple test case - Batches", function () {
            browser.eyesSetBatch("My Feature", "My Feature" + process.env.BATCH_ID);
            browser.eyesOpen("Hello world 2");
            browser.url('/helloworld');
            browser.eyesCheckWindow("Homepage");
            browser.click('button');
            browser.eyesCheckWindow("After click");
            browser.eyesClose(false);
        });

        it("Simple test case - Tags & regions & page objects", () => {
            browser.eyesTag("Prop1", "Val1");
            browser.eyesTag("Feature", "Feature1");
            browser.eyesOpen("Page objects tests wdio");
            HelloWorldPage.open();
            var a = Target.region(HelloWorldPage.title);
            browser.eyesCheck("title", Target.region(HelloWorldPage.title).layout());
            browser.click('button');
            browser.eyesCheck("click me", Target.region(HelloWorldPage.clickMeBtn));
            browser.eyesClose(false);
            browser.eyesClearTags();
        });
    });
});