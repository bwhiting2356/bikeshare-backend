// import { findBestStation} from "../findBestStation/findBestStation";
// import { SearchQuery} from "../../shared/SearchQuery";
//
// export const findFirstStation = (searchQuery: SearchQuery) => {
//     const stationsWithDataPromise = searchQuery.timeTarget === 'Depart at'
//         ? originStationsPromise
//         : mergedStationsWithBicyclingDataPromise
//     const stationStartPromise = findBestStation(
//         originStationsPromise,
//         query.datetime,
//         query.origin.coords,
//         'walking',
//         'origin');
//
//     const stationStartPromise = findBestStation(
//         mergedStationsWithBicyclingDataPromise,
//         (await stationEndPromise).reservationTime,
//         stationEndLoc,
//         'bicycling',
//         'destination');
// }