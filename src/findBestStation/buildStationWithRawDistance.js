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
var distanceCrowFlies_1 = require("./distanceCrowFlies");
exports.buildStationWithRawDistance = function (station, loc) {
    var coords = {
        lat: station.lat,
        lng: station.lng
    };
    return __assign({}, station, { distanceFromLoc: distanceCrowFlies_1.distanceCrowFlies(loc, coords) });
};
//# sourceMappingURL=buildStationWithRawDistance.js.map