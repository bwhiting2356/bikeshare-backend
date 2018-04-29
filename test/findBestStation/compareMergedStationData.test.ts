import { expect } from 'chai';

import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { compareMergedStationData } from "../../src/findBestStation/compareMergedStationData";

describe('Compare Merged Station Data', function() {
    it('should return the correct difference of distances', () => {
        const mergedStation1: StationDataWithWalking = {
            stationData: {
                id: 1,
                address: '123',
                lat: 0,
                lng: 0,
                distanceFromLoc: 2,
                capacity: 10,
                currentInv: 1,
            },
            walkingDistanceMatrixResult: {
                distance: {
                    text: '',
                    value: 2
                },
                duration: {
                    text: '',
                    value: 1
                },
                status: 'OK'
            }
        };

        const mergedStation2: StationDataWithWalking = {
            stationData: {
                id: 1,
                address: '123',
                lat: 0,
                lng: 0,
                distanceFromLoc: 2,
                capacity: 10,
                currentInv: 1,
            },
            walkingDistanceMatrixResult: {
                distance: {
                    text: '',
                    value: 3
                },
                duration: {
                    text: '',
                    value: 1
                },
                status: 'OK'
            }
        };

        expect(compareMergedStationData(mergedStation1, mergedStation2)).to.equal(-1);
        expect(compareMergedStationData(mergedStation2, mergedStation1)).to.equal(1);
    });
});