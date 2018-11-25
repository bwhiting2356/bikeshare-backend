import { expect } from 'chai';

import { sequelize } from "../../db/db";
import { Event } from "../../db/models/event/Event";
import { getEventsByStationId } from "../../src/isReservationAvailable/getEventsByStationId";
import { Station } from "../../db/models/station/Station";
import { mockStations } from "../../db/mockData/mockStations";
import { Reservation } from "../../db/models/reservation/Reservation";
import { mockReservations } from "../../db/mockData/mockReservations";
import {transformEvents} from "../../src/makeReservation/transformEvents";
import {ReservationType} from "../../shared/ReservationType";
import {ReservationEvent} from "../../shared/ReservationEvent";

describe('Transform Events', function() {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
        await Station.bulkCreate(mockStations);
        await Reservation.bulkCreate(mockReservations);
        await Event.bulkCreate([
                {
                    id: 1,
                    reservationId: 1,
                    time: "2018-11-23T20:00:00.749Z",
                    potentialLowInv: 1,
                    potentialHighInv: 1,
                },
                {
                    id: 2,
                    reservationId: 1,
                    time: "2018-11-23T20:04:00.749Z",
                    potentialLowInv: 1,
                    potentialHighInv: 1,
                },
                {
                    id: 3,
                    reservationId: 1,
                    time: "2018-11-23T20:08:00.749Z",
                    potentialLowInv: 1,
                    potentialHighInv: 1,
                },
                {
                    id: 4,
                    reservationId: 1,
                    time: "2018-11-23T20:12:00.749Z",
                    potentialLowInv: 1,
                    potentialHighInv: 1,
                }
            ]);
    });

    // it('should should properly decrement inventory of events after pickup', async () => {
    //
    //     const startTime =  "2018-11-23T20:01:00.749Z";
    //     const endTime = "2018-11-23T20:11:00.749Z";
    //
    //     await transformEvents(startTime, endTime, 'pickup');
    //
    //     const event1: any = await Event.findById(1);
    //     expect(event1.potentialLowInv).to.equal(1);
    //     expect(event1.potentialHighInv).to.equal(1);
    //
    //     const event2: any = await Event.findById(2);
    //     expect(event2.potentialLowInv).to.equal(0);
    //     expect(event2.potentialHighInv).to.equal(1);
    //
    //     const event3: any = await Event.findById(3);
    //     expect(event3.potentialLowInv).to.equal(0);
    //     expect(event3.potentialHighInv).to.equal(1);
    //
    //     const event4: any = await Event.findById(4);
    //     expect(event4.potentialLowInv).to.equal(0);
    //     expect(event4.potentialHighInv).to.equal(0);
    // });

    it('should should properly increment inventory of events after dropoff', async () => {

        const startTime =  "2018-11-23T20:01:00.749Z";
        const endTime = "2018-11-23T20:11:00.749Z";

        await transformEvents(startTime, endTime, 'dropoff');

        const event1: any = await Event.findById(1);
        expect(event1.potentialLowInv).to.equal(1);
        expect(event1.potentialHighInv).to.equal(1);

        const event2: any = await Event.findById(2);
        expect(event2.potentialLowInv).to.equal(1);
        expect(event2.potentialHighInv).to.equal(2);

        const event3: any = await Event.findById(3);
        expect(event3.potentialLowInv).to.equal(1);
        expect(event3.potentialHighInv).to.equal(2);

        const event4: any = await Event.findById(4);
        expect(event4.potentialLowInv).to.equal(2);
        expect(event4.potentialHighInv).to.equal(2);
    });

});