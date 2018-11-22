import { expect } from 'chai';
import { calculateBicyclingRentalFee, PRICE_PER_MINUTE } from "../../src/findBestTrip/calculateBicyclingRentalFee";

describe("Calculate Bicycling Rental Fee", function() {
  it('should correctly compute the price', () => {
      expect(calculateBicyclingRentalFee(60)).to.equal(PRICE_PER_MINUTE);
      expect(calculateBicyclingRentalFee(59)).to.equal(PRICE_PER_MINUTE);
      expect(calculateBicyclingRentalFee(61)).to.equal(PRICE_PER_MINUTE * 2);
      expect(calculateBicyclingRentalFee(600)).to.equal(PRICE_PER_MINUTE * 10);
  })
});