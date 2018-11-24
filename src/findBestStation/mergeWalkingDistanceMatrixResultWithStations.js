"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compareMergedStationData_1 = require("./compareMergedStationData");
exports.mergeWalkingDistanceMatrixResultWithStations = function (response, stationsData) {
    return response
        .map(function (row, i) {
        return {
            walkingDistanceMatrixResult: row,
            stationData: stationsData[i]
        };
    })
        .filter(function (mergedData) { return mergedData.walkingDistanceMatrixResult.status !== 'ZERO_RESULTS'; })
        .sort(compareMergedStationData_1.compareMergedStationData);
};
//# sourceMappingURL=mergeWalkingDistanceMatrixResultWithStations.js.map