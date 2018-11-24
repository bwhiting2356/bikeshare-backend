"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var addSeconds_1 = require("../../src/helpers/addSeconds");
describe('Add Seconds', function () {
    it('should add the correct amount of seconds to the time', function () {
        var time1 = new Date("2018-04-01T00:00:00.000Z");
        var time2 = new Date("2018-04-01T00:00:30.000Z");
        chai_1.expect(addSeconds_1.addSeconds(time1, 30)).to.deep.equal(time2);
    });
});
//# sourceMappingURL=addSeconds.test.js.map