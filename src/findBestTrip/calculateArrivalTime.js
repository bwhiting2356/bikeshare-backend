"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addSeconds_1 = require("../helpers/addSeconds");
exports.calculateArrivalTime = function (query, stationEndResult) {
    if (query.timeTarget === 'Arrive by') {
        return query.datetime;
    }
    else if (query.timeTarget === 'Depart at') {
        console.log("\n\n\n");
        console.log(stationEndResult.reservationTime);
        console.log(stationEndResult.station.walkingDistanceMatrixResult.duration.value);
        console.log("\n\n\n");
        return addSeconds_1.addSeconds(stationEndResult.reservationTime, stationEndResult.station.walkingDistanceMatrixResult.duration.value);
    }
    else {
        throw new Error('invalid time target');
    }
};
//# sourceMappingURL=calculateArrivalTime.js.map