"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var toCurrency_1 = require("../../src/helpers/toCurrency");
describe('To Currency', function () {
    it('should truncate the number to two decimal places', function () {
        chai_1.expect(toCurrency_1.toCurrency(0.4444)).to.equal(0.44);
    });
});
//# sourceMappingURL=toCurrency.test.js.map