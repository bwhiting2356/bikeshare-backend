"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subtractSeconds_1 = require("../helpers/subtractSeconds");
exports.calculateDepartureTime = function (query, stationEndResult) {
    if (query.timeTarget === 'Depart at') {
        return query.datetime;
    }
    else if (query.timeTarget === 'Arrive by') {
        return subtractSeconds_1.subtractSeconds(stationEndResult.reservationTime, stationEndResult.station.walkingDistanceMatrixResult.duration.value);
    }
    else {
        throw new Error('Invalid Time Target');
    }
};
//# sourceMappingURL=calculateDepartureTime.js.map