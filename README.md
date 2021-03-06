[![npm version](https://badge.fury.io/js/wdio-eyes.selenium-service.svg)](https://badge.fury.io/js/wdio-eyes.selenium-service)
# wdio-eyes.selenium-service
For the official Applitools-webdriverio package please go to the [official tutorial](https://applitools.com/tutorials/webdriverio.html) or go directly to [eyes.webdriverio package](https://www.npmjs.com/package/@applitools/eyes.webdriverio)

This package is an unofficial wrapper built to let you chose between two applitools official packages [Eyes-Selenium](https://www.npmjs.com/package/@applitools/eyes-selenium) and [eyes.webdriverio](https://www.npmjs.com/package/@applitools/eyes.webdriverio) via a configuration flag, and it is wrapping bridge integration as part of it. 

For the purpose of this package you will need an Applitools account, If you don't have one yet, please go and [signup here](https://applitools.com/users/register) for free trial account.

To install run: `npm i wdio-eyes.selenium-service --save-dev`

Initial setup:
- Insert the following sections in your config file (wdio.conf.js) 
    - `services: ['eyes.selenium'],` //To enable eyes.selenium service
    - Configuration params, a subset of the following object:       
    ```javascript
    applitools: {
        apiKey: process.env.API_KEY,                //Required
        appName: "My Application",                  //Recommended
        viewport: {width: 1111, height: 650},       //Recommended for web, don't use in mobile
        batchName: "Config Batch",                  //Optional
        globalMatchLevel: "Layout",                 //Optional
        disableCSSScrolling: true,                  //Optional
        disableFullPageScreenshot: true,            //Optional
        serverUrl: "https://myeyes.applitools.com", //Optional
        debug: true,                                //Optional
        disable: false,                             //Optional, relevant only if =true
        useEyesWDIO: true,                          //Optional, Use Applitools new WDIO sdk under the hood
        sendDom: true,                              //Optional, Currently for EyesWDIO, default:true
    },
    ```
- Create your first test in tests/specs folder (if needed create the folders too)
    ```javascript
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
        });
    });
    ```
- Advanced scenarios:
  - Fluent syntax - Describe all you need from your checkpoint in one liner short syntax:
  ```javascript
  var Target = require('edio-eyes.selenium-service').getTarget();
  //...
  //Checking the window with Layout algorithm
  browser.eyesCheck("Checkpoint1", Target.window().layout());
  //Working with regions and Page objects
  browser.eyesCheck("Checkpoint2", Target.region(HelloWorldPage.title).layout());
  ```
  - Tags - Tagging interesting metrics of your tests later to be used with the "group by feature"
  ![](https://user-images.githubusercontent.com/6667420/52020130-d7a64c00-24f8-11e9-8fb2-dc0189dabca7.png)
  ```javascript
  browser.eyesTag("Feature", "Feature1"); //can be called x #of different metrics you want to introduce
  browser.eyesOpen("Hello world 1");
  //... rest of the test
  browser.eyesClose(false);
  // Clearing up tags if we want a fresh start for the next test
  browser.eyesClearTags();
  ```
