import { expect } from 'chai';

import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { compareStationsWithRawDistance } from "../../src/findNearestStation/compareStationsWithRawDistance";

describe('Compare Station Raw Distance', function() {
    it('should return the correct difference of distances', () => {
        const stationRawDistance1: StationDataWithDistance = {
            id: 1,
            address: '123',
            lat: 0,
            lng: 0,
            distanceFromLoc: 1,
            capacity: 10,
            currentInv: 1,
        };

        const stationRawDistance2: StationDataWithDistance = {
            id: 1,
            address: '123',
            lat: 0,
            lng: 0,
            distanceFromLoc: 2,
            capacity: 10,
            currentInv: 1,
        };

        expect(compareStationsWithRawDistance(stationRawDistance1, stationRawDistance2)).to.equal(-1);
        expect(compareStationsWithRawDistance(stationRawDistance2, stationRawDistance1)).to.equal(1);
    });
});