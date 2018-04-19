import { expect } from 'chai';

import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { StationWithDistance } from "../../shared/StationWithDistance";
import { MergedStationData } from "../../shared/MergedStationData";
import { mergeDistanceMatrixResultWithStations } from "../../src/findNearestStations/mergeDistanceMatrixResultWithStations";

describe('Merge Distance Matrix Result With Stations', function() {
    it('should correctly merge items', () => {
        const distanceMatrixResultRows: DistanceMatrixResultRow[] = [{
            distance: { text: '1.5 km', value: 1461 },
            duration: { text: '19 mins', value: 1117 },
            status: 'OK'
        }];

        const stations: StationWithDistance[] = [{
            id: '2',
            coords: {
                lat: 40.696021,
                lng: -73.94352
            },
            address: '248 Throop Ave',
            distanceFromLoc: 0.31194029043889854
        }];

        const expectedResult: MergedStationData[] = [{
            stationData: stations[0],
            distanceMatrixResult: distanceMatrixResultRows[0]
        }];

        expect(mergeDistanceMatrixResultWithStations(distanceMatrixResultRows, stations)).to.deep.equal(expectedResult);
    })
});