"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var buildDistanceMatrixQuery_1 = require("../../src/googleMaps/buildDistanceMatrixQuery");
describe('Build Distance Matrix Query', function () {
    it('should build a distance matrix query', function () {
        var stationsWithRawDistance = [
            {
                id: 1,
                lat: 40.695756,
                lng: -73.946182,
                capacity: 10,
                currentInv: 0,
                address: '896 Myrtle Ave',
                distanceFromLoc: 0.17257437339372905
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
        var location = {
            lat: 40.695884,
            lng: -73.949472
        };
        var expectedResult = {
            origins: [{ lat: 40.695884, lng: -73.949472 }],
            destinations: [
                { lat: 40.695756, lng: -73.946182 },
                { lat: 40.696021, lng: -73.94352 }
            ],
            mode: 'walking'
        };
        chai_1.expect(buildDistanceMatrixQuery_1.buildDistanceMatrixQuery('walking', stationsWithRawDistance, location)).to.deep.equal(expectedResult);
    });
});
//# sourceMappingURL=buildDistanceMatrixQuery.test.js.map