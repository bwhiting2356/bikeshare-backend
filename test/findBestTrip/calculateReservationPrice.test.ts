import { expect } from 'chai';
import { calculateReservationPrice, MAX_COST, MAX_PAYOUT } from "../../src/findBestTrip/calculateReservationPrice";

describe("Calculate Reservation Price", function() {
    it(`should return the maximum possible price:
    * station has 1 bike left
    * request is for pickup`, () => {
        expect(calculateReservationPrice(1, 10, 'pickup')).to.equal(MAX_COST)
    });

    it(`should return the maximum possible price:
    * station has 1 spot left
    * request is for dropoff`, () => {
        expect(calculateReservationPrice(9, 10, 'dropoff')).to.equal(MAX_COST)
    });

    it(`should return the maximum possible payout:
    * station is full
    * request is for pickup`, () => {
        expect(calculateReservationPrice(10, 10, 'pickup')).to.equal(MAX_PAYOUT)
    });

    it(`should return the maximum possible payout:
    * station is empty
    * request is for dropoff`, () => {
        expect(calculateReservationPrice(0, 10, 'dropoff')).to.equal(MAX_PAYOUT)
    });
});