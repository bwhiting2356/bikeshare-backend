import { expect } from "chai";
import { LatLng } from "../../shared/LatLng";
import { Station } from "../../shared/Station";
import { buildStationWithRawDistance } from "../../src/findNearestStations/buildStationWithRawDistance";

describe('Build Station With Raw Distance', function() {
    it('should correctly build an object with distance from location', () => {
        const location: LatLng = {
            lat: 40.699372,
            lng: -73.953423
        };
        const station: Station = {
            id: 'a1',
            address: '123',
            coords: {
                lat: 40.700802,
                lng: -73.941866
            }

        };

        const stationWithRawDistance = buildStationWithRawDistance(station, location);
        expect(stationWithRawDistance).to.deep.equal({
            id: 'a1',
            address: '123',
            coords: {
                lat: 40.700802,
                lng: -73.941866
            },
            distanceFromLoc: 0.6133878802545135

        })
    });
});