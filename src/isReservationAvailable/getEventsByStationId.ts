import { Event } from "../../db/models/event/Event";
import { Reservation } from "../../db/models/reservation/Reservation";

export const getEventsByStationId = (stationId: number) => {
    return Event.findAll({
        raw: true,
        include: [{
            model: Reservation,
            where: { stationId }
        }]
    });
};