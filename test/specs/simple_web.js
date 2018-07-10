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
    });
});