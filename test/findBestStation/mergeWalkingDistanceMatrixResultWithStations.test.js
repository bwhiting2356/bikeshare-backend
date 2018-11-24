"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mergeWalkingDistanceMatrixResultWithStations_1 = require("../../src/findBestStation/mergeWalkingDistanceMatrixResultWithStations");
describe('Merge Walking Distance Matrix Result With Stations', function () {
    it('should correctly merge items', function () {
        var distanceMatrixResultRows = [{
                distance: { text: '1.5 km', value: 1461 },
                duration: { text: '19 mins', value: 1117 },
                status: 'OK'
            }];
        var stations = [{
                id: 2,
                lat: 40.696021,
                lng: -73.94352,
                capacity: 10,
                currentInv: 0,
                address: '248 Throop Ave',
                distanceFromLoc: 0.31194029043889854
            }];
        var expectedResult = [{
                stationData: stations[0],
                walkingDistanceMatrixResult: distanceMatrixResultRows[0]
            }];
        chai_1.expect(mergeWalkingDistanceMatrixResultWithStations_1.mergeWalkingDistanceMatrixResultWithStations(distanceMatrixResultRows, stations)).to.deep.equal(expectedResult);
    });
    it('should remove error results', function () {
        var distanceMatrixResultRows = [
            {
                status: 'ZERO_RESULTS'
            },
            {
                distance: { text: '1.5 km', value: 1461 },
                duration: { text: '19 mins', value: 1117 },
                status: 'OK'
            },
        ];
        var stations = [
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
        var expectedResult = [{
                stationData: stations[1],
                walkingDistanceMatrixResult: distanceMatrixResultRows[1]
            }];
        chai_1.expect(mergeWalkingDistanceMatrixResultWithStations_1.mergeWalkingDistanceMatrixResultWithStations(distanceMatrixResultRows, stations)).to.deep.equal(expectedResult);
    });
});
//# sourceMappingURL=mergeWalkingDistanceMatrixResultWithStations.test.js.map