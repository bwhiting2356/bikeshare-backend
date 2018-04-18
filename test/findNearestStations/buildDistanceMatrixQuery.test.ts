import { expect } from 'chai';

import { StationWithDistance } from "../../shared/StationWithDistance";
import { buildDistanceMatrixQuery } from "../../src/findNearestStations/buildDistanceMatrixQuery";
import { DistanceMatixQuery } from "../../shared/DistanceMatrixQuery";


describe('Build Distance Matrix Query', function() {
    it('should build a distance matrix query', () => {
        const stationsWithRawDistance: StationWithDistance[] = [
            {
                id: '1',
                coords: {
                    lat: 40.695756,
                    lng: -73.946182
                },
                address: '896 Myrtle Ave',
                distanceFromLoc: 0.17257437339372905
            },
            {
                id: '2',
                coords: {
                    lat: 40.696021,
                    lng: -73.94352
                },
                address: '248 Throop Ave',
                distanceFromLoc: 0.31194029043889854
            }
        ];
        const location = {
            lat: 40.695884,
            lng: -73.949472
        };
        const expectedResult: DistanceMatixQuery = {
            origins: [ { lat: 40.695884, lng: -73.949472 } ],
            destinations: [
                { lat: 40.695756, lng: -73.946182 },
                { lat: 40.696021, lng: -73.94352 }
                ],
            mode: 'walking'
        };

        expect(buildDistanceMatrixQuery(stationsWithRawDistance, location)).to.deep.equal(expectedResult);

    })

});