"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../../db/models/event/Event");
var Reservation_1 = require("../../db/models/reservation/Reservation");
exports.getEventsByStationId = function (stationId) {
    return Event_1.Event.findAll({
        raw: true,
        include: [{
                model: Reservation_1.Reservation,
                where: { stationId: stationId }
            }]
    });
};
//# sourceMappingURL=getEventsByStationId.js.map