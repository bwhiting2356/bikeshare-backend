"use strict";
// import { sequelize } from "../../db/db";
// import { Reservation } from "../../db/models/reservation/Reservation";
// import {Event} from "../../db/models/event/Event";
// import {findPreviousEvent} from "../../src/isReservationAvailable/findPreviousEvent";
// import {ReservationEvent} from "../../shared/ReservationEvent";
// import {addSeconds} from "../../src/helpers/addSeconds";
// import {ReservationType} from "../../shared/ReservationType";
// import {StationAttributes} from "../../db/models/station/StationAttributes";
//
// describe('Make Reservation', function() {
//     before(async () => {
//         await sequelize.sync({ force: true });
//     });
//
//     it('should create a reservation and correctly adjust inventory events', async () => {
//
//         const reservation: any = await Reservation.create();
//
//         const previousEvents: ReservationEvent[] = [
//             {
//                 time:  new Date("2018-04-19T04:00:00.316Z"),
//                 potentialLowInv: 1,
//                 potentialHighInv: 1
//             },
//             {
//                 time: new Date("2018-04-19T05:00:00.316Z"),
//                 potentialLowInv: 1,
//                 potentialHighInv: 1
//             },
//             {
//                 time:  new Date("2018-04-19T07:00:00.316Z"),
//                 potentialLowInv: 1,
//                 potentialHighInv: 1
//             },
//             {
//                 time:  new Date("2018-04-19T07:05:00.316Z"),
//                 potentialLowInv: 1,
//                 potentialHighInv: 1
//             },
//             {
//                 time:  new Date("2018-04-19T08:00:00.316Z"),
//                 potentialLowInv: 1,
//                 potentialHighInv: 1
//             },
//             {
//                 time:  new Date("2018-04-19T09:00:00.316Z"),
//                 potentialLowInv: 1,
//                 potentialHighInv: 1
//             }
//         ];
//
//         const station: StationAttributes = {
//             id: 1,
//             address: '123',
//             lat: 40.700802,
//             lng: -73.941866,
//             currentInv: 1,
//             capacity: 10
//
//         };
//
//         const reservationStartTime = new Date("2018-04-19T07:01:00.316Z");
//         const reservationEndTime = addSeconds(reservationStartTime, 600);
//
//         const beforeFirstEvent = findPreviousEvent(reservationStartTime, previousEvents);
//         const beforeSecondEvent = findPreviousEvent(reservationEndTime, previousEvents);
//
//         const reservationType: ReservationType = 'pickup';
//
//         if (reservationType == 'pickup') {
//             const firstEvent = await Event.create({
//                 potentialHighInv: beforeFirstEvent ? beforeFirstEvent.potentialLowInv : station.currentInv,
//                 potentialLowInv: beforeFirstEvent ? beforeFirstEvent.potentialLowInv - 1 : station.currentInv - 1,
//                 time: reservationStartTime,
//                 reservationId: reservation.dataValues.id
//             });
//
//             const secondEvent = await Event.create({
//                 potentialHighInv: beforeFirstEvent ? beforeFirstEvent.potentialLowInv : station.currentInv,
//                 potentialLowInv: beforeFirstEvent ? beforeFirstEvent.potentialLowInv - 1 : station.currentInv - 1,
//                 time: reservationEndTime,
//                 reservationId: reservation.dataValues.id
//             });
//
//             // TODO: maybe create the events without incrementing/decreenting, and to the transformation along with everything else
//         }
//
//
//
//
//         // console.log(event);
//
//         // if the reservation is pickup, decrement the lowInv immediately, decrement the highInv ten minutes later
//         // if the reservation is dropoff, increment the highInv immediately, increment the lowInv ten minutes later
//
//
//         /*
//         time: Sequelize.DATE,
//     potentialHighInv: Sequelize.INTEGER,
//     potentialLowInv: Sequelize.INTEGER,
//          */
//
//
//         console.log(reservation.dataValues.id);
//     });
//
// });
//# sourceMappingURL=makeReservation.test.js.map