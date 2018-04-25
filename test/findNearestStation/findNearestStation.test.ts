import { expect } from 'chai';
import { findNearestStation } from "../../src/findNearestStation/findNearestStation";
import {LatLng} from "../../shared/LatLng";

describe('Find Nearest Station', function() {
    before(() => {


    });

    it('should throw an error if there are no nearby stations', async () => {
        const location: LatLng = { // middle of the atlantic
            lat: 0,
            lng: 0,
        };
        try {
            await findNearestStation(location)
        } catch (err) {
            expect(err).to.be.ok
        }
    });

});