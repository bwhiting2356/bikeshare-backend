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
exports.mergeBicyclingDistanceMatrixResultWithStations = function (response, stationsData) {
    return response
        .map(function (row, i) {
        return __assign({}, stationsData[i], { bicyclingDistanceMatrixResult: row });
    })
        .filter(function (mergedData) { return mergedData.bicyclingDistanceMatrixResult.status === 'OK'; });
};
//# sourceMappingURL=mergeBicyclingDistanceMatrixResultWithStations.js.map