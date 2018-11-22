"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var findPreviousEvent_1 = require("../../src/isReservationAvailable/findPreviousEvent");
describe('Find Previous event', function () {
    it('should return null if there are no events at all', function () {
        var queryTime = new Date("2018-04-19T04:52:40.316Z");
        chai_1.expect(findPreviousEvent_1.findPreviousEvent(queryTime, [])).to.equal(null);
    });
    it('should return null if there are no events before the time', function () {
        var queryTime = new Date("2018-04-19T03:52:40.316Z");
        var events = [{
                time: new Date("2018-04-19T04:52:40.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            }];
        chai_1.expect(findPreviousEvent_1.findPreviousEvent(queryTime, [])).to.equal(null);
    });
    it('should return the expected previous event', function () {
        var query = {
            time: new Date("2018-04-19T06:00:00.316Z"),
            stationId: 2,
            type: 'pickup'
        };
        var queryTime = new Date("2018-04-19T06:00:00.316Z");
        var previousEvents = [
            {
                time: new Date("2018-04-19T04:00:00.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            },
            {
                time: new Date("2018-04-19T05:00:00.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            },
            {
                time: new Date("2018-04-19T07:00:00.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            }
        ];
        chai_1.expect(findPreviousEvent_1.findPreviousEvent(queryTime, previousEvents)).to.deep.equal({
            time: new Date("2018-04-19T05:00:00.316Z"),
            potentialLowInv: 1,
            potentialHighInv: 1
        });
    });
});
//# sourceMappingURL=findPreviousEvent.test.js.map