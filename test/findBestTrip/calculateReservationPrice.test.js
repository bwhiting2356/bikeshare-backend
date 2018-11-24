"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var calculateReservationPrice_1 = require("../../src/findBestTrip/calculateReservationPrice");
describe("Calculate Reservation Price", function () {
    it("should return the maximum possible price:\n    * station has 1 bike left\n    * request is for pickup", function () {
        chai_1.expect(calculateReservationPrice_1.calculateReservationPrice(1, 10, 'pickup')).to.equal(calculateReservationPrice_1.MAX_COST);
    });
    it("should return the maximum possible price:\n    * station has 1 spot left\n    * request is for dropoff", function () {
        chai_1.expect(calculateReservationPrice_1.calculateReservationPrice(9, 10, 'dropoff')).to.equal(calculateReservationPrice_1.MAX_COST);
    });
    it("should return the maximum possible payout:\n    * station is full\n    * request is for pickup", function () {
        chai_1.expect(calculateReservationPrice_1.calculateReservationPrice(10, 10, 'pickup')).to.equal(calculateReservationPrice_1.MAX_PAYOUT);
    });
    it("should return the maximum possible payout:\n    * station is empty\n    * request is for dropoff", function () {
        chai_1.expect(calculateReservationPrice_1.calculateReservationPrice(0, 10, 'dropoff')).to.equal(calculateReservationPrice_1.MAX_PAYOUT);
    });
});
//# sourceMappingURL=calculateReservationPrice.test.js.map