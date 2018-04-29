import { expect } from 'chai';

import { addSeconds } from "../../src/helpers/addSeconds";

describe('Add Seconds', function() {
   it('should add the correct amount of seconds to the time', () => {
       const time1 = new Date("2018-04-01T00:00:00.000Z");
       const time2 = new Date("2018-04-01T00:00:30.000Z");

       expect(addSeconds(time1, 30)).to.deep.equal(time2);
   })
});