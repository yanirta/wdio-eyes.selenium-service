const Target = require('../../index.js').getTarget();

describe('NYT Cooking', function () {
    this.timeout(300000);
    describe("Test cases", function () {
        it("NYTimes cooking", () => {
            browser.url('https://cooking.nytimes.com/');
            browser.eyesOpen("NYT Cooking");
            browser.eyesCheckWindow('homepage');
            browser.eyesClose(true);
        });

        it("NYTimes side meny", () => {
            browser.url('https://cooking.nytimes.com/');
            browser.pause(1000);
            browser.eyesOpen("NYT Cooking side menu test");
            browser.eyesCheckWindow('homepage');
            browser.element('a.nytc---hamburgerbtn---hamburger').click();
            browser.eyesCheck('side menu', Target.region($('.nytc---drawer---open')));
            browser.eyesClose(true);
        });
    });
})