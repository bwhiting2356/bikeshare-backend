import { expect } from 'chai';


import { toCurrency } from "../../src/helpers/toCurrency";

describe('To Currency', function() {
    it('should truncate the number to two decimal places', () => {
        expect(toCurrency(0.4444)).to.equal(0.44);
    });
});
