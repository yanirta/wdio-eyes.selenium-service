describe('NYT Cooking', function () {
    this.timeout(300000);
    describe("Test cases", function () {
        it("NYTimes cooking", () => {
            browser.url('https://cooking.nytimes.com/');
            browser.eyesOpen("NYT Cooking");
            browser.eyesCheckWindow('homepage');
            browser.eyesClose(true);
        });
    });
})