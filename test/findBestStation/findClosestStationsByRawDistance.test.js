"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var findClosestStationsByRawDistance_1 = require("../../src/findBestStation/findClosestStationsByRawDistance");
var chai_1 = require("chai");
describe('Find Closest Stations Raw Distance', function () {
    var station1;
    var station2;
    var station3;
    var station4;
    var station5;
    var stationList;
    var location;
    var expectedResult;
    beforeEach(function () {
        station1 = {
            id: 1,
            address: '896 Myrtle Ave',
            lat: 40.695756,
            lng: -73.946182,
            capacity: 10,
            currentInv: 1,
        };
        station2 = {
            id: 2,
            address: '248 Throop Ave',
            lat: 40.696021,
            lng: -73.943520,
            capacity: 10,
            currentInv: 1
        };
        station3 = {
            id: 3,
            address: '1031 Myrtle',
            lat: 40.696418,
            lng: -73.940743,
            capacity: 10,
            currentInv: 1,
        };
        station4 = {
            id: 4,
            address: '1111 Myrtle Ave',
            lat: 40.696760,
            lng: -73.937832,
            capacity: 10,
            currentInv: 1,
        };
        station5 = {
            id: 5,
            address: '1134 Myrtle Ave',
            lat: 40.697057,
            lng: -73.934795,
            capacity: 10,
            currentInv: 1,
        };
        stationList = [station3, station2, station4, station1, station5];
        location = {
            lat: 40.695884,
            lng: -73.949472
        };
        expectedResult = [
            {
                id: 1,
                lat: 40.695756,
                lng: -73.946182,
                address: '896 Myrtle Ave',
                distanceFromLoc: 0.17257437339372905,
                capacity: 10,
                currentInv: 1,
            },
            {
                id: 2,
                lat: 40.696021,
                lng: -73.94352,
                address: '248 Throop Ave',
                distanceFromLoc: 0.31194029043889854,
                capacity: 10,
                currentInv: 1,
            },
            {
                id: 3,
                lat: 40.696418,
                lng: -73.940743,
                address: '1031 Myrtle',
                distanceFromLoc: 0.45875504119752186,
                capacity: 10,
                currentInv: 1,
            }
        ];
    });
    it('should return the right length of items', function () {
        chai_1.expect(findClosestStationsByRawDistance_1.findClosestStationsByRawDistance(stationList, location, 2).length).to.equal(2);
    });
    it('should return correct results', function () {
        chai_1.expect(findClosestStationsByRawDistance_1.findClosestStationsByRawDistance(stationList, location, 3)).to.deep.equal(expectedResult);
    });
});
//# sourceMappingURL=findClosestStationsByRawDistance.test.js.map