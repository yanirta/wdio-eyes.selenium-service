var Page = require('./page');

class HelloWorldPage extends Page {
    constructor() {
        super();
    }

    get title() { return $('.title'); }
    get clickMeBtn() { return browser.element('.button-section'); }

    open() {
        super.open('/helloworld');
    }

    clickMe() {
        return this.clickMe.click();
    }
}

module.exports = new HelloWorldPage();