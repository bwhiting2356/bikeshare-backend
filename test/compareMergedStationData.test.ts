import { expect } from 'chai';

import { MergedStationData } from "../shared/MergedStationData";
import { compareMergedStationData } from "../src/findNearestStations/compareMergedStationData";

describe('Compare Merged Station Data', function() {
    it('should return the correct difference of distances', () => {
        const mergedStation1: MergedStationData = {
            stationData: {
                id: '1',
                address: '123',
                coords: {
                    lat: 0,
                    lng: 0
                },
                distanceFromLoc: 2
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
                status: ''
            }
        };

        const mergedStation2: MergedStationData = {
            stationData: {
                id: '1',
                address: '123',
                coords: {
                    lat: 0,
                    lng: 0
                },
                distanceFromLoc: 2
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
                status: ''
            }
        };

        expect(compareMergedStationData(mergedStation1, mergedStation2)).to.equal(-1);
        expect(compareMergedStationData(mergedStation2, mergedStation1)).to.equal(1);
    });
});