"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var findExtremeInventoryEvent_1 = require("../../src/isReservationAvailable/findExtremeInventoryEvent");
describe('Find Extreme Inventory event', function () {
    it('should return null if there are no events at all', function () {
        var query = {
            stationId: 1,
            time: new Date("2018-04-19T06:00:00.316Z"),
            type: 'pickup',
        };
        chai_1.expect(findExtremeInventoryEvent_1.findExtremeInventoryEvent(query, [])).to.equal(null);
    });
    it('should return null if the time is after all the events', function () {
        var query = {
            stationId: 1,
            time: new Date("2018-04-19T07:00:00.316Z"),
            type: 'pickup',
        };
        var events = [
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
                time: new Date("2018-04-19T06:00:00.316Z"),
                potentialLowInv: 1,
                potentialHighInv: 1
            }
        ];
        chai_1.expect(findExtremeInventoryEvent_1.findExtremeInventoryEvent(query, events)).to.equal(null);
    });
    it('should return the highest future event if type is dropoff', function () {
        var query = {
            stationId: 1,
            time: new Date("2018-04-19T01:00:00.316Z"),
            type: 'dropoff',
        };
        var events = [
            {
                time: new Date("2018-04-19T04:00:00.316Z"),
                potentialLowInv: 5,
                potentialHighInv: 6
            },
            {
                time: new Date("2018-04-19T05:00:00.316Z"),
                potentialLowInv: 3,
                potentialHighInv: 5
            },
            {
                time: new Date("2018-04-19T06:00:00.316Z"),
                potentialLowInv: 2,
                potentialHighInv: 4
            }
        ];
        chai_1.expect(findExtremeInventoryEvent_1.findExtremeInventoryEvent(query, events)).to.deep.equal({
            time: new Date("2018-04-19T04:00:00.316Z"),
            potentialLowInv: 5,
            potentialHighInv: 6
        });
    });
    it('should return the lowest future event if type is pickup', function () {
        var query = {
            stationId: 1,
            time: new Date("2018-04-19T01:00:00.316Z"),
            type: 'pickup',
        };
        var events = [
            {
                time: new Date("2018-04-19T04:00:00.316Z"),
                potentialLowInv: 5,
                potentialHighInv: 6
            },
            {
                time: new Date("2018-04-19T05:00:00.316Z"),
                potentialLowInv: 3,
                potentialHighInv: 5
            },
            {
                time: new Date("2018-04-19T06:00:00.316Z"),
                potentialLowInv: 2,
                potentialHighInv: 4
            }
        ];
        chai_1.expect(findExtremeInventoryEvent_1.findExtremeInventoryEvent(query, events)).to.deep.equal({
            time: new Date("2018-04-19T06:00:00.316Z"),
            potentialLowInv: 2,
            potentialHighInv: 4
        });
    });
});
//# sourceMappingURL=findExtremeInventoryEvent.test.js.map