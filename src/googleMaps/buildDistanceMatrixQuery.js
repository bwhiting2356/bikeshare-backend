"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDistanceMatrixQuery = function (mode, stations, location) {
    var stationsCoords = stations.map(function (station) {
        return {
            lat: station.lat,
            lng: station.lng
        };
    });
    return {
        origins: [location],
        destinations: stationsCoords,
        mode: mode
    };
};
//# sourceMappingURL=buildDistanceMatrixQuery.js.map