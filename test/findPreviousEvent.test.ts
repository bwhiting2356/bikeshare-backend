import { expect } from 'chai';
import { findPreviousEvent } from "../src/findPreviousEvent";
import { ReservationEvent } from "../shared/ReservationEvent";
import { ReservationQuery } from "../shared/ReservationQuery";

describe('Find Previous Event', function() {
    it('should return null if there are no events at all', () => {
        const query: ReservationQuery = {
            time: new Date("2018-04-19T04:52:40.316Z"),
            stationId: 2,
            type: 'pickup'
        };
        expect(findPreviousEvent([], query)).to.equal(null)
    });

    it('should return null if there are no events before the time', () => {
        const query: ReservationQuery = {
            time: new Date("2018-04-19T03:52:40.316Z"),
            stationId: 2,
            type: 'pickup'
        };
        expect(findPreviousEvent([
            {
                time: new Date("2018-04-19T04:52:40.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            }

        ], query)).to.equal(null)
    });

    it('should return the expected previous event', () => {
        const query: ReservationQuery = {
            time: new Date("2018-04-19T06:00:00.316Z"),
            stationId: 2,
            type: 'pickup'
        };
        const previousEvents: ReservationEvent[] = [
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
                time:  new Date("2018-04-19T07:00:00.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            }
        ];


        expect(findPreviousEvent(previousEvents, query)).to.deep.equal({
            time: new Date("2018-04-19T05:00:00.316Z"),
            potentialLowInv: 1,
            potentialHighInv: 1
        });
    })
});