import { expect } from 'chai';
import { findExtremeInventoryEvent } from "../src/findExtremeInventoryEvent";
import { ReservationEvent } from "../shared/ReservationEvent";
import { ReservationQuery } from "../shared/ReservationQuery";

describe('Find Extreme Inventory Event', function() {
    it('should return null if there are no events at all', () => {
        const query: ReservationQuery = {
            stationId: 1,
            time: new Date("2018-04-19T06:00:00.316Z"),
            type: 'pickup',
        };

        expect(findExtremeInventoryEvent(query, [])).to.equal(null)
    });

    it('should return null if the time is after all the events', () => {
        const query: ReservationQuery = {
            stationId: 1,
            time: new Date("2018-04-19T07:00:00.316Z"),
            type: 'pickup',
        };

        const events: ReservationEvent[] = [
            {
                time:  new Date("2018-04-19T04:00:00.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            },
            {
                time: new Date("2018-04-19T05:00:00.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            },
            {
                time:  new Date("2018-04-19T06:00:00.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            }
        ];

        expect(findExtremeInventoryEvent(query, events)).to.equal(null);
    });
});