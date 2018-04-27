// import { BestStationResult } from "../../shared/BestStationResult";
// import { DirectionsResponse } from "../../shared/DirectionsResponse";
// import { TripData } from "../../shared/TripData";
// import { SearchQuery } from "../../shared/SearchQuery";
// import { subtractSeconds } from "../helpers/subtractSeconds";
// import { SuccessRow } from "../../shared/DistanceMatrixResultRow";
// import { addSeconds } from "../helpers/addSeconds";
// import {LatLng} from "../../shared/LatLng";
//
// /*
//     stationStart: {
//         id: string;
//         coords: LatLng;
//         address: string;
//         price: number;
//         time: Date;
//     },
//     bicyclingTravel: {
//         feet: number;
//         seconds: number;
//         points: LatLng[];
//         price: number;
//     },
//  */
//
// export const buildTripData = async (
//     query: SearchQuery,
//     stationStartPromise: Promise<BestStationResult>,
//     stationEndPromise: Promise<BestStationResult>,
//     walking1DirectionsPromise: Promise<DirectionsResponse>,
//     walking2DirectionsPromise: Promise<DirectionsResponse>,
//     bicyclingDirectionsPromise: Promise<DirectionsResponse>
// ) => {
//     const stationStartResult = await stationStartPromise;
//     const stationEndResult = await stationEndPromise;
//     const walking1Travel = await walking1DirectionsPromise;
//     const walking2Travel = await walking2DirectionsPromise;
//     const bicyclingTravel = await bicyclingDirectionsPromise;
//
//     const departureTime: Date = query.timeTarget === 'Depart at'
//         ? query.datetime
//         : subtractSeconds(
//             stationStartResult.reservationTime,
//             (stationStartResult.station.walkingDistanceMatrixResult as SuccessRow).duration.value);
//
//     const arrivalTime: Date = query.timeTarget === 'Arrive by'
//         ? query.datetime
//         : addSeconds(
//             stationEndResult.reservationTime,
//             (stationEndResult.station.walkingDistanceMatrixResult as SuccessRow).duration.value);
//
//     const stationStart = {
//         id: stationStartResult.station.stationData.id,
//         coords: {
//             lat: stationStartResult.station.stationData.lat,
//             lng: stationStartResult.station.stationData.lng
//         }
//
//     }
//     const stationEnd = stationEndResult.station.stationData;
//
//     const tripData: TripData = {
//         origin: query.origin,
//         destination: query.destination,
//         departureTime,
//         arrivalTime,
//         walking1Travel,
//         walking2Travel,
//         bicyclingTravel,
//         stationStart,
//         stationEnd,
//         status: 'test'
//
//     }
//
// };