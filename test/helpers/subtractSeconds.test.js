"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var subtractSeconds_1 = require("../../src/helpers/subtractSeconds");
describe('Subtract Seconds', function () {
    it('should subtract the correct amount of seconds to the time', function () {
        var time1 = new Date("2018-04-01T00:00:30.000Z");
        var time2 = new Date("2018-04-01T00:00:00.000Z");
        chai_1.expect(subtractSeconds_1.subtractSeconds(time1, 30)).to.deep.equal(time2);
    });
});
//# sourceMappingURL=subtractSeconds.test.js.map