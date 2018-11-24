"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var compareStationsWithRawDistance_1 = require("../../src/findBestStation/compareStationsWithRawDistance");
describe('Compare Station Raw Distance', function () {
    it('should return the correct difference of distances', function () {
        var stationRawDistance1 = {
            id: 1,
            address: '123',
            lat: 0,
            lng: 0,
            distanceFromLoc: 1,
            capacity: 10,
            currentInv: 1,
        };
        var stationRawDistance2 = {
            id: 1,
            address: '123',
            lat: 0,
            lng: 0,
            distanceFromLoc: 2,
            capacity: 10,
            currentInv: 1,
        };
        chai_1.expect(compareStationsWithRawDistance_1.compareStationsWithRawDistance(stationRawDistance1, stationRawDistance2)).to.equal(-1);
        chai_1.expect(compareStationsWithRawDistance_1.compareStationsWithRawDistance(stationRawDistance2, stationRawDistance1)).to.equal(1);
    });
});
//# sourceMappingURL=compareStationsWithRawDistance.test.js.map