"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareMergedStationData = function (a, b) {
    var aDistanceMatrixRow = a.walkingDistanceMatrixResult;
    var bDistanceMatrixRow = b.walkingDistanceMatrixResult;
    if (aDistanceMatrixRow.distance && bDistanceMatrixRow.distance) {
        return aDistanceMatrixRow.distance.value - bDistanceMatrixRow.distance.value;
    }
    else {
        return -Infinity;
    }
};
//# sourceMappingURL=compareMergedStationData.js.map