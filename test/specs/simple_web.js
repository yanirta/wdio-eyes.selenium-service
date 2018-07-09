describe('Simple cases', function () {
    this.timeout(300000);
    describe("Test native App", function () {
        it("test-function-1",function () {
            browser.EyesOpen("Hello world 1");
            browser.url('/helloworld');
            browser.EyesCheckWindow("Homepage");
            browser.click('button');
            browser.EyesCheckWindow("After click");
            browser.EyesClose(false);
        });

        it("test-function-2",function () {
            browser.EyesOpen("Hello world 2");
            browser.url('/helloworld');
            browser.EyesCheckWindow("Homepage");
            browser.click('button');
            browser.EyesCheckWindow("After click");
            browser.EyesClose(false);
        });
    });
});