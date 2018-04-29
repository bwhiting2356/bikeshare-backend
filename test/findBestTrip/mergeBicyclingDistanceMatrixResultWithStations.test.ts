import { expect } from 'chai';
import {
    mergeBicyclingDistanceMatrixResultWithStations
} from "../../src/findBestTrip/mergeBicyclingDistanceMatrixResultWithStations";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { StationDataWithBicycling } from "../../shared/StationDataWithBicycling";

describe('Merge Bicycling Distance Matrix Result With Stations', function() {
    it('should correctly merge items', () => {
        const distanceMatrixResultRows: DistanceMatrixResultRow[] = [{
            distance: { text: '1.5 km', value: 1461 },
            duration: { text: '19 mins', value: 1117 },
            status: 'OK'
        }];

        const stations: StationDataWithWalking[] = [{
            stationData: {
                id: 2,
                lat: 40.696021,
                lng: -73.94352,
                capacity: 10,
                currentInv: 0,
                address: '248 Throop Ave',
                distanceFromLoc: 0.31194029043889854
            },
            walkingDistanceMatrixResult: {
                distance: { text: '10 km', value: 14 },
                duration: { text: '10 mins', value: 11 },
                status: 'OK'
            }
        }];

        const expectedResult: StationDataWithBicycling[] = [{
            ...stations[0],
            bicyclingDistanceMatrixResult: distanceMatrixResultRows[0]
        }];

        expect(mergeBicyclingDistanceMatrixResultWithStations(distanceMatrixResultRows, stations))
            .to.deep.equal(expectedResult);
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

        const stations: StationDataWithWalking[] = [
            {
                stationData: {
                    id: 1,
                    lat: 40.696021,
                    lng: -73.94352,
                    capacity: 10,
                    currentInv: 0,
                    address: 'A address',
                    distanceFromLoc: 0.31194029043889854
                },
                walkingDistanceMatrixResult: {
                    distance: {text: '10 km', value: 14},
                    duration: {text: '10 mins', value: 11},
                    status: 'OK'
                }
            },
            {
                stationData: {
                    id: 2,
                    lat: 40.696021,
                    lng: -73.94352,
                    capacity: 10,
                    currentInv: 0,
                    address: 'B address',
                    distanceFromLoc: 0.31194029043889854
                },
                walkingDistanceMatrixResult: {
                    distance: { text: '1.5 km', value: 1461 },
                    duration: { text: '19 mins', value: 1117 },
                    status: 'OK'
                },
            }
        ];

        const expectedResult: StationDataWithBicycling[] = [{
            ...stations[1],
            bicyclingDistanceMatrixResult: distanceMatrixResultRows[1]
        }];

        expect(mergeBicyclingDistanceMatrixResultWithStations(distanceMatrixResultRows, stations))
            .to.deep.equal(expectedResult);
    });
});