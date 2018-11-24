"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
var convertKmToMiles = function (km) {
    return km * 0.621371;
};
exports.distanceCrowFlies = function (point1, point2) {
    if (!point1 || !point2 || isNaN(point1.lat) || isNaN(point1.lng) || isNaN(point2.lat) || isNaN(point2.lng)) {
        throw new Error("missing points with lat lng arguments");
    }
    var lat1 = point1.lat, lon1 = point1.lng;
    var lat2 = point2.lat, lon2 = point2.lng;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return convertKmToMiles(d);
};
//# sourceMappingURL=distanceCrowFlies.js.map