// import { expect } from 'chai';
// import { findBestStation } from "../../src/findBestStation/findBestStation";
// import { SearchQuery } from "../../shared/SearchQuery";
// import { sequelize } from "../../db/db";
// import { mockStations } from "../../db/mockData/mockStations";
// import { Station } from "../../db/models/station/Station";
// import { Reservation} from "../../db/models/reservation/Reservation";
// import { mockReservations } from "../../db/mockData/mockReservations";
// import { Event } from "../../db/models/event/Event";
//
// describe('Find Nearest Station', function() {
//
//     describe('', () => {
//         it(`should throw an error:
//         * request location is very far`,
//             async () => {
//                 const badQuery: SearchQuery = {
//                     origin: {
//                         coords: {
//                             lat: 0,
//                             lng: 1
//                         },
//                         address: ''
//                     },
//                     destination: {
//                         coords: {
//                             lat: 1,
//                             lng: 1
//                         },
//                         address: ''
//                     },
//                     timeTarget: 'Depart at',
//                     datetime: new Date()
//                 };
//                 try {
//                     await findBestStation(badQuery, 'origin')
//                 } catch (err) {
//                     expect(err).to.be.ok
//                 }
//             });
//
//     });
//
//     describe('', () => {
//         before(async () => {
//             await sequelize.sync({ force: true });
//             await Station.bulkCreate(mockStations)
//         });
//
//         it(`should return true:
//         * request location is nearby
//         * stations have no future reservations`,
//             async () => {
//                 const query: SearchQuery = {
//                     origin: {
//                         coords: {
//                             lat: 40.695045,
//                             lng: -73.952586
//                         },
//                         address: ''
//                     },
//                     destination: {
//                         coords: {
//                             lat: 40.691464,
//                             lng: -73.936879,
//                         },
//                         address: ''
//                     },
//                     timeTarget: 'Depart at',
//                     datetime: new Date()
//                 };
//                 const nearestStation = await findBestStation(query, 'origin');
//                 expect(nearestStation).to.deep.equal({
//                     currentStation: {
//                         walkingDistanceMatrixResult: {
//                             distance: {
//                                 text: "0.5 km",
//                                 value: 546
//                             },
//                             duration: {
//                                 text: "7 mins",
//                                 value: 416
//                             },
//                             status: "OK"
//                         },
//                         stationData: {
//                             id: 1,
//                             capacity: 10,
//                             currentInv: 1,
//                             address: "896 Myrtle Ave",
//                             lat: 40.695756,
//                             lng: -73.946182,
//                             distanceFromLoc: 0.3390552569668154
//                         }
//                     },
//                     availability: {
//                         result: true,
//                         value: 1
//                     }
//                 })
//             });
//     });
//
//     describe('', () => {
//         before(async () => {
//             await sequelize.sync({ force: true });
//             await Station.bulkCreate(mockStations);
//             await Reservation.bulkCreate(mockReservations);
//             await Event.bulkCreate([
//                 {
//                     id: 1,
//                     reservationId: 1,
//                     time: new Date("2018-04-24T18:50:05.156Z"),
//                     potentialLowInv: 1,
//                     potentialHighInv: 2
//                 },
//                 {
//                     id: 2,
//                     reservationId: 3,
//                     time: new Date("2018-04-24T18:50:05.156Z"),
//                     potentialLowInv: 1,
//                     potentialHighInv: 2
//                 },
//                 {
//                     id: 3,
//                     reservationId: 5,
//                     time: new Date("2018-04-24T18:50:05.156Z"),
//                     potentialLowInv: 1,
//                     potentialHighInv: 2
//                 },
//             ])
//         });
//
//         it(`should return false:
//         * request location is nearby
//         * request is for pickup
//         * all nearby stations empty at that time`, async () => {
//             const query: SearchQuery = {
//                 origin: {
//                     coords: {
//                         lat: 40.695045,
//                         lng: -73.952586
//                     },
//                     address: ''
//                 },
//                 destination: {
//                     coords: {
//                         lat: 40.691464,
//                         lng: -73.936879,
//                     },
//                     address: ''
//                 },
//                 timeTarget: 'Depart at',
//                 datetime: new Date()
//             };
//
//             try {
//                 await findBestStation(query, 'origin')
//             } catch (err) {
//
//             }
//         })
//     });
// });