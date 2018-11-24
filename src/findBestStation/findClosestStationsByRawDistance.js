"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildStationWithRawDistance_1 = require("./buildStationWithRawDistance");
var compareStationsWithRawDistance_1 = require("./compareStationsWithRawDistance");
exports.findClosestStationsByRawDistance = function (stations, location, limit) {
    return stations.map(function (station) { return buildStationWithRawDistance_1.buildStationWithRawDistance(station, location); })
        .sort(compareStationsWithRawDistance_1.compareStationsWithRawDistance)
        .slice(0, limit);
};
//# sourceMappingURL=findClosestStationsByRawDistance.js.map