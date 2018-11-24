import { expect } from 'chai';

import { sequelize } from "../../db/db";
import { mockStations } from "../../db/mockData/mockStations";
import { mockEvents } from "../../db/mockData/mockEvents";
import { mockReservations } from "../../db/mockData/mockReservations";
import { Station } from "../../db/models/station/Station";
import { Reservation } from "../../db/models/reservation/Reservation";
import { Event } from "../../db/models/event/Event";
import { getEventsByStationId } from "../../src/isReservationAvailable/getEventsByStationId";

describe('Get Events By Station Id', function() {
    before(async () => {
        await sequelize.sync({force: true });
        await Station.bulkCreate(mockStations);
        await Reservation.bulkCreate(mockReservations);
        await Event.bulkCreate(mockEvents);
    });

    it('should return all the events at that station', async () => {
        const stationId = 1;
        const events = await getEventsByStationId(stationId);
        const expectedResult = [
            {
                id: 1,
                time: "2018-04-24 18:50:05.156 +00:00",
                reservationId: 1,
                potentialLowInv: 1,
                potentialHighInv: 2,
                "reservation.id": 1,
                "reservation.stationId": 1,
                "reservation.userId": null
            },
            {
                id: 2,
                time: "2018-04-24 18:55:05.156 +00:00",
                potentialLowInv: 2,
                potentialHighInv: 2,
                "reservationId": 2,
                "reservation.id": 2,
                "reservation.stationId": 1,
                "reservation.userId": null
            }];

        expect(events).to.deep.equal(expectedResult)

    })

});