// import { expect } from 'chai';
// import {SearchQuery} from "../../shared/SearchQuery";
// import {findBestTrip} from "../../src/findBestTrip/findBestTrip";
// import {mockStations} from "../../db/mockData/mockStations";
// import {Reservation} from "../../db/models/reservation/Reservation";
// import {Station} from "../../db/models/station/Station";
// import {mockReservations} from "../../db/mockData/mockReservations";
// import {Event} from "../../db/models/event/Event";
// import {mockEvents} from "../../db/mockData/mockEvents";
// import {sequelize} from "../../db/db";
// import {TripData} from "../../shared/TripData";
//
// describe("Find Best Trip", function() {
//     // before(async () => {
//     //
//     // });
//     it('should return the correct trip', async () => {
//         // origin
//         const myrtle_nostrand = {
//             lat: 40.695077,
//             lng: -73.952543
//         };
//
//         // destination
//         const gates_malcolmx = {
//             lat: 40.688567,
//             lng: -73.930227
//         };
//
//         // expected station 1
//         const willoughby_nostrand = {
//             lat: 40.693571,
//             lng: -73.952234
//         };
//
//         // expected station 2
//         const lewis_gates = {
//             lat: 40.687939,
//             lng: -73.936053
//         };
//
//         await sequelize.sync({force: true});
//         await Station.bulkCreate([
//             {
//                 id: 1,
//                 capacity: 10,
//                 currentInv: 1,
//                 address: "Willoughby & Nostrand",
//                 lat: willoughby_nostrand.lat,
//                 lng: willoughby_nostrand.lng
//             },
//             {
//                 id: 2,
//                 capacity: 10,
//                 currentInv: 9,
//                 address: "Lewis & Gates",
//                 lat: lewis_gates.lat,
//                 lng: lewis_gates.lng
//             }
//         ]);
//
//         const query: SearchQuery = {
//             origin: {
//                 coords: myrtle_nostrand,
//                 address: 'Corner of Myrtle and Nostrand'
//             },
//             destination: {
//                 coords: gates_malcolmx,
//                 address: 'Corner of Gates & Malcolm X'
//             },
//             timeTarget: 'Depart at',
//             datetime: new Date("2018-04-00T00:00:00.000Z")
//         };
//         const actualResult = await findBestTrip(query);
//
//         const expectedResult: TripData = {
//             origin: {
//                 coords: myrtle_nostrand,
//                 address: 'Corner of Myrtle and Nostrand'
//             },
//             destination: {
//                 coords: gates_malcolmx,
//                 address: 'Corner of Gates & Malcolm X'
//             },
//             departureTime: new Date("2018-04-00T00:00:00.000Z]"),
//             arrivalTime: new Date("2018-04-27T23:19:16.671Z"),
//             walking1Travel: {
//                 points: [
//                     {"lat":40.6950197,"lng":-73.952581},
//                     {"lat":40.69576319999999,"lng":-73.9461834}
//                     ],
//                 feet: 546,
//                 seconds: 416
//             },
//             walking2Travel: {
//                 points: [
//                     {"lat":40.6950197,"lng":-73.952581},
//                     {"lat":40.69638430000001,"lng":-73.9407481},
//                     {"lat":40.6964168,"lng":-73.9407543}
//                     ],
//                 feet: 1021,
//                 seconds: 778
//             },
//             bicyclingTravel: {
//                 points: [
//                     {"lat":40.6957277,"lng":-73.9461764},
//                     {"lat":40.696354,"lng":-73.94069449999999},
//                     {"lat":40.6964219,"lng":-73.9407073}
//                     ],
//                 feet: 475,
//                 seconds: 147,
//                 price: 0
//             },
//             stationStart: {
//                 id: 1,
//                 coords: willoughby_nostrand,
//                 address: "Willoughby & Nostrand",
//                 price: -1,
//                 time: new Date("2018-04-27T23:10:56.671Z")
//             },
//             stationEnd: {
//                 id: 2,
//                 coords: lewis_gates,
//                 address: "Lewis & Gates",
//                 price: -1,
//                 time: new Date("2018-04-27T22:53:13.671Z")
//             },
//             status: "test"
//         };
//
//         expect(actualResult).to.equal(expectedResult);
//
//     })
// });