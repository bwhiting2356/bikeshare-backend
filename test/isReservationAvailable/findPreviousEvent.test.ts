import { expect } from 'chai';
import { findPreviousEvent } from "../../src/isReservationAvailable/findPreviousEvent";
import { ReservationEvent } from "../../shared/ReservationEvent";
import { ReservationQuery } from "../../shared/ReservationQuery";

describe('Find Previous event', function() {
    it('should return null if there are no events at all', () => {
        const queryTime = new Date("2018-04-19T04:52:40.316Z")
        expect(findPreviousEvent(queryTime, [])).to.equal(null)
    });

    it('should return null if there are no events before the time', () => {
        const queryTime = new Date("2018-04-19T03:52:40.316Z");

        const events = [{
            time: new Date("2018-04-19T04:52:40.316Z"),
            potentialLowInv: 1,
            potentialHighInv: 1
        }];

        expect(findPreviousEvent(queryTime, [])).to.equal(null);
    });

    it('should return the expected previous event', () => {
        const query: ReservationQuery = {
            time: new Date("2018-04-19T06:00:00.316Z"),
            stationId: 2,
            type: 'pickup'
        };
        const queryTime = new Date("2018-04-19T06:00:00.316Z");
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


        expect(findPreviousEvent(queryTime, previousEvents)).to.deep.equal({
            time: new Date("2018-04-19T05:00:00.316Z"),
            potentialLowInv: 1,
            potentialHighInv: 1
        });
    })
});