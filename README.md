# wdio-eyes.selenium-service
[Applitools](https://applitools.com) Eyes support for [webdriver.io](https://http://webdriver.io/).
This wrapper built around the most maintained JS package of Applitools.Eyes that is more stable and contains the most recent features.

If you don't have an Applitools account yet, [signup](https://applitools.com/users/register) for free for a trial account.

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
        disableCSSScrolling: True,                  //Optional
        disableFullPageScreenshot: True,            //Optional
        serverUrl: "https://myeyes.applitools.com"  //Optional
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