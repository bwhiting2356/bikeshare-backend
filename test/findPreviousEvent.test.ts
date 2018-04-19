import { expect } from 'chai';
import { findPreviousEvent } from "../src/findPreviousEvent";
import { ReservationEvent } from "../shared/ReservationEvent";

describe('Find Previous Event', function() {
    it('should return null if there are no events at all', () => {
        expect(findPreviousEvent([], new Date())).to.equal(null)
    });

    it('should return null if there are no events before the time', () => {
        const currentTime = new Date("2018-04-19T03:52:40.316Z");
        expect(findPreviousEvent([
            {
                time: new Date("2018-04-19T04:52:40.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            }

        ], new Date())).to.equal(null)
    });

    it('should return the expected previous event', () => {
        const currentTime = new Date("2018-04-19T06:00:00.316Z");
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


        expect(findPreviousEvent(previousEvents, currentTime)).to.deep.equal({
            time: new Date("2018-04-19T05:00:00.316Z"),
            potentialLowInv: 1,
            potentialHighInv: 1
        });
    })
});