import { expect } from "chai";
import { LatLng } from "../../shared/LatLng";
import { buildStationWithRawDistance } from "../../src/findNearestStation/buildStationWithRawDistance";
import { StationAttributes } from "../../db/models/station/StationAttributes";

describe('Build Station With Raw Distance', function() {
    it('should correctly build an object with distance from location', () => {
        const location: LatLng = {
            lat: 40.699372,
            lng: -73.953423
        };
        const station: StationAttributes = {
            id: 1,
            address: '123',
            lat: 40.700802,
            lng: -73.941866,
            currentInv: 1,
            capacity: 10

        };

        const stationWithRawDistance = buildStationWithRawDistance(station, location);
        expect(stationWithRawDistance).to.deep.equal({
            id: 1,
            currentInv: 1,
            capacity: 10,
            address: '123',
            lat: 40.700802,
            lng: -73.941866,
            distanceFromLoc: 0.6133878802545135
        })
    });
});