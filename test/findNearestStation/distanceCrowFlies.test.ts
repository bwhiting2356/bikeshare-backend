import { expect } from 'chai';
import { LatLng } from "../../shared/LatLng";
import { distanceCrowFlies } from "../../src/findNearestStation/distanceCrowFlies";

describe('Distance Crow Flies', function() {
    it('should correctly compute distance', () => {
        const flushing: LatLng = {
            lat: 40.699372,
            lng: -73.953423
        };
        const broadway: LatLng = {
            lat: 40.700802,
            lng: -73.941866
        };
        const distance = distanceCrowFlies(flushing, broadway);
        expect(distance).to.equal(0.6133878802545135);
    });
});