"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var calculateBicyclingRentalFee_1 = require("../../src/findBestTrip/calculateBicyclingRentalFee");
describe("Calculate Bicycling Rental Fee", function () {
    it('should correctly compute the price', function () {
        chai_1.expect(calculateBicyclingRentalFee_1.calculateBicyclingRentalFee(60)).to.equal(calculateBicyclingRentalFee_1.PRICE_PER_MINUTE);
        chai_1.expect(calculateBicyclingRentalFee_1.calculateBicyclingRentalFee(59)).to.equal(calculateBicyclingRentalFee_1.PRICE_PER_MINUTE);
        chai_1.expect(calculateBicyclingRentalFee_1.calculateBicyclingRentalFee(61)).to.equal(calculateBicyclingRentalFee_1.PRICE_PER_MINUTE * 2);
        chai_1.expect(calculateBicyclingRentalFee_1.calculateBicyclingRentalFee(600)).to.equal(calculateBicyclingRentalFee_1.PRICE_PER_MINUTE * 10);
    });
});
//# sourceMappingURL=calculateBicyclingRentalFee.test.js.map