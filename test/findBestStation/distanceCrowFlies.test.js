"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var distanceCrowFlies_1 = require("../../src/findBestStation/distanceCrowFlies");
describe('Distance Crow Flies', function () {
    it('should correctly compute distance', function () {
        var flushing = {
            lat: 40.699372,
            lng: -73.953423
        };
        var broadway = {
            lat: 40.700802,
            lng: -73.941866
        };
        var distance = distanceCrowFlies_1.distanceCrowFlies(flushing, broadway);
        chai_1.expect(distance).to.equal(0.6133878802545135);
    });
});
//# sourceMappingURL=distanceCrowFlies.test.js.map