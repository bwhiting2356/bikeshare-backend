import { expect } from 'chai';
import { subtractSeconds } from "../../src/helpers/subtractSeconds";

describe('Subtract Seconds', function() {
    it('should subtract the correct amount of seconds to the time', () => {
        const time1 = new Date("2018-04-01T00:00:30.000Z");
        const time2 = new Date("2018-04-01T00:00:00.000Z");

        expect(subtractSeconds(time1, 30)).to.deep.equal(time2);
    })
});