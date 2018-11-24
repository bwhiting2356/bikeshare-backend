"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var compareMergedStationData_1 = require("../../src/findBestStation/compareMergedStationData");
describe('Compare Merged Station Data', function () {
    it('should return the correct difference of distances', function () {
        var mergedStation1 = {
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
        var mergedStation2 = {
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
        chai_1.expect(compareMergedStationData_1.compareMergedStationData(mergedStation1, mergedStation2)).to.equal(-1);
        chai_1.expect(compareMergedStationData_1.compareMergedStationData(mergedStation2, mergedStation1)).to.equal(1);
    });
});
//# sourceMappingURL=compareMergedStationData.test.js.map