import { expect } from 'chai';

import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { MergedStationData } from "../../shared/MergedStationData";
import { mergeDistanceMatrixResultWithStations } from "../../src/findNearestStation/mergeDistanceMatrixResultWithStations";

describe('Merge Distance Matrix Result With Stations', function() {
    it('should correctly merge items', () => {
        const distanceMatrixResultRows: DistanceMatrixResultRow[] = [{
            distance: { text: '1.5 km', value: 1461 },
            duration: { text: '19 mins', value: 1117 },
            status: 'OK'
        }];

        const stations: StationDataWithDistance[] = [{
            id: 2,
            lat: 40.696021,
            lng: -73.94352,
            capacity: 10,
            currentInv: 0,
            address: '248 Throop Ave',
            distanceFromLoc: 0.31194029043889854
        }];

        const expectedResult: MergedStationData[] = [{
            stationData: stations[0],
            distanceMatrixResult: distanceMatrixResultRows[0]
        }];

        expect(mergeDistanceMatrixResultWithStations(distanceMatrixResultRows, stations)).to.deep.equal(expectedResult);
    });

    it('should remove error results', () => {
        const distanceMatrixResultRows: DistanceMatrixResultRow[] = [
            {
                status: 'ZERO_RESULTS'
            },
            {
                distance: { text: '1.5 km', value: 1461 },
                duration: { text: '19 mins', value: 1117 },
                status: 'OK'
            },

            ];

        const stations: StationDataWithDistance[] = [
            {
                id: 1,
                lat: 0,
                lng: 0,
                capacity: 10,
                currentInv: 0,
                address: '248 Throop Ave',
                distanceFromLoc: 0.31194029043889854

            },
            {
                id: 2,
                lat: 40.696021,
                lng: -73.94352,
                capacity: 10,
                currentInv: 0,
                address: '248 Throop Ave',
                distanceFromLoc: 0.31194029043889854
            }
        ];

        const expectedResult: MergedStationData[] = [{
            stationData: stations[1],
            distanceMatrixResult: distanceMatrixResultRows[1]
        }];
        expect(mergeDistanceMatrixResultWithStations(distanceMatrixResultRows, stations)).to.deep.equal(expectedResult);


    });
});