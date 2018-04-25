import { expect } from 'chai';

import { MergedStationData } from "../../shared/MergedStationData";
import { compareMergedStationData } from "../../src/findNearestStation/compareMergedStationData";

describe('Compare Merged Station Data', function() {
    it('should return the correct difference of distances', () => {
        const mergedStation1: MergedStationData = {
            stationData: {
                id: 1,
                address: '123',
                lat: 0,
                lng: 0,
                distanceFromLoc: 2,
                capacity: 10,
                currentInv: 1,
            },
            distanceMatrixResult: {
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

        const mergedStation2: MergedStationData = {
            stationData: {
                id: 1,
                address: '123',
                lat: 0,
                lng: 0,
                distanceFromLoc: 2,
                capacity: 10,
                currentInv: 1,
            },
            distanceMatrixResult: {
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