"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mergeBicyclingDistanceMatrixResultWithStations_1 = require("../../src/findBestTrip/mergeBicyclingDistanceMatrixResultWithStations");
describe('Merge Bicycling Distance Matrix Result With Stations', function () {
    it('should correctly merge items', function () {
        var distanceMatrixResultRows = [{
                distance: { text: '1.5 km', value: 1461 },
                duration: { text: '19 mins', value: 1117 },
                status: 'OK'
            }];
        var stations = [{
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
        var expectedResult = [__assign({}, stations[0], { bicyclingDistanceMatrixResult: distanceMatrixResultRows[0] })];
        chai_1.expect(mergeBicyclingDistanceMatrixResultWithStations_1.mergeBicyclingDistanceMatrixResultWithStations(distanceMatrixResultRows, stations))
            .to.deep.equal(expectedResult);
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
                    distance: { text: '10 km', value: 14 },
                    duration: { text: '10 mins', value: 11 },
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
        var expectedResult = [__assign({}, stations[1], { bicyclingDistanceMatrixResult: distanceMatrixResultRows[1] })];
        chai_1.expect(mergeBicyclingDistanceMatrixResultWithStations_1.mergeBicyclingDistanceMatrixResultWithStations(distanceMatrixResultRows, stations))
            .to.deep.equal(expectedResult);
    });
});
//# sourceMappingURL=mergeBicyclingDistanceMatrixResultWithStations.test.js.map