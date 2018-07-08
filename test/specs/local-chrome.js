describe('Simple cases', function () {
    this.timeout(300000);
    describe("Test native App", function () {
        it("test-function",function () {
            browser.EyesOpen("My App");
            browser.url('/helloworld');
            browser.EyesCheckWindow("asdv");
            browser.click('button');
            browser.EyesClose(false);
        });

        it("test-function",function () {
            browser.EyesOpen("My App");
            browser.url('/helloworld');
            browser.EyesCheckWindow("asdv");
            browser.click('button');
            browser.EyesClose(false);
        });
    });
});