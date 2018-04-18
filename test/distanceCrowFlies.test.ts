import { expect } from 'chai';
import { LatLng } from "../shared/LatLng";
import { distanceCrowFlies } from "../src/findNearestStations/distanceCrowFlies";

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
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

    it('should throw error if inputs are missing points', () => {
        const flushing: LatLng = {
            lat: 40.699372,
            lng: -73.953423
        };
        const broadway: LatLng = {
            lat: 40.700802,
            lng: -73.941866
        };
        expect(() => distanceCrowFlies(null, null)).to.throw();
        expect(() => distanceCrowFlies(null, broadway)).to.throw();
        expect(() => distanceCrowFlies(flushing, null)).to.throw();
    })
});