// import { findClosestStationsByWalkingDistance } from "./findClosestStationsByWalkingDistance";
// import { isReservationAvailable } from "../isReservationAvailable/isReservationAvailable";
// import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
// import { SearchQuery } from "../../shared/SearchQuery";
// import { ReservationQuery } from "../../shared/ReservationQuery";
// import { ReservationEvent } from "../../shared/ReservationEvent";
// import { addSeconds } from "../helpers/addSeconds";
// import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
// import { getEventsByStationId } from "../isReservationAvailable/getEventsByStationId";
// import {subtractSeconds} from "../helpers/subtractSeconds";
//
// type stage = 'origin' | 'destination';
//
// export const findBestStation = async (
//     searchQuery: SearchQuery,
//     stage: stage) => {
//     const nearestStations: StationDataWithWalking[] = await findClosestStationsByWalkingDistance(searchQuery.origin.coords);
//     if (!nearestStations || !nearestStations.length) {
//         throw new Error("no nearby stations")
//     }
//     let found = false;
//     while (nearestStations && !found) {
//
//         // check for errors
//         const currentStation = nearestStations.shift();
//         if (!currentStation) {
//             continue;
//         }
//         const distanceMatrixResult: DistanceMatrixResultRow = currentStation.walkingDistanceMatrixResult;
//         if (!distanceMatrixResult.duration) {
//             throw new Error("distance matrix result value not present");
//         }
//
//         const events = (await getEventsByStationId(currentStation.stationData.id)) as ReservationEvent[];
//
//         // get the time of the proposed reservation
//         let time;
//         if (stage === 'origin' && searchQuery.timeTarget === 'Depart at') {
//             time = addSeconds(searchQuery.datetime, distanceMatrixResult.duration.value);
//         } else if (stage === 'destination' && searchQuery.timeTarget === 'Arrive by') {
//             time = subtractSeconds(searchQuery.datetime, distanceMatrixResult.duration.value);
//         } else if (stage === 'origin' && searchQuery.timeTarget === 'Arrive by') {
//             throw new Error("not implemented yet!!")
//         } else if (stage === 'destination' && searchQuery.timeTarget === 'Depart at') {
//             throw new Error("not implemented yet!!")
//         } else {
//             throw new Error("not implemented yet!!")
//         }
//
//         // build query
//         const query: ReservationQuery = {
//             type: stage === 'origin' ? 'pickup' : 'dropoff',
//             time,
//             stationId: currentStation.stationData.id
//         };
//
//         // test availability
//         const availability = await isReservationAvailable(time, currentStation.stationData, query, events);
//         if (availability && availability.result) {
//             return {
//                 currentStation,
//                 availability
//             };
//         }
//     }
//     throw new Error("no nearby stations available at this time")
// };