var HelloWorldPage = require('../pageobjects/hello.world');
var Target = require('eyes.selenium').Target;
var By = require('selenium-webdriver').By;

describe('Simple cases', function () {
    this.timeout(300000);
    describe("Test native App", function () {
        it("test-function-1",function () {
            browser.eyesOpen("Hello world 1");
            browser.url('/helloworld');
            browser.eyesCheckWindow("Homepage");
            browser.click('button');
            browser.eyesCheckWindow("After click");
            browser.eyesClose(false);
        });

        it("test-function-2",function () {
            browser.eyesOpen("Hello world 2");
            browser.url('/helloworld');
            browser.eyesCheckWindow("Homepage");
            browser.click('button');
            browser.eyesCheckWindow("After click");
            browser.eyesClose(false);
        });

        it("test page objects regions", () => {
            browser.eyesOpen("Page objects tests wdio");
            HelloWorldPage.open();
            browser.eyesCheck("title", Target.region(HelloWorldPage.title));
            browser.eyesCheck("click me", Target.region(HelloWorldPage.clickMeBtn));
            browser.eyesClose(false);
        });
    });
});