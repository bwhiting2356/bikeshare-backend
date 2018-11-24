"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var buildStationWithRawDistance_1 = require("../../src/findBestStation/buildStationWithRawDistance");
describe('Build Station With Raw Distance', function () {
    it('should correctly build an object with distance from location', function () {
        var location = {
            lat: 40.699372,
            lng: -73.953423
        };
        var station = {
            id: 1,
            address: '123',
            lat: 40.700802,
            lng: -73.941866,
            currentInv: 1,
            capacity: 10
        };
        var stationWithRawDistance = buildStationWithRawDistance_1.buildStationWithRawDistance(station, location);
        chai_1.expect(stationWithRawDistance).to.deep.equal({
            id: 1,
            currentInv: 1,
            capacity: 10,
            address: '123',
            lat: 40.700802,
            lng: -73.941866,
            distanceFromLoc: 0.6133878802545135
        });
    });
});
//# sourceMappingURL=buildStationWithRawDistance.test.js.map