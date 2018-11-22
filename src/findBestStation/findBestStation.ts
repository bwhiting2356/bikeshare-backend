import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { LatLng } from "../../shared/LatLng";
import { ReservationQuery } from "../../shared/ReservationQuery";
import { isReservationAvailable } from "../isReservationAvailable/isReservationAvailable";

import { getEventsByStationId } from "../isReservationAvailable/getEventsByStationId";

import { ReservationEvent } from "../../shared/ReservationEvent";
import { DistanceMatrixResultRow, SuccessRow } from "../../shared/DistanceMatrixResultRow";

import { addSeconds } from "../helpers/addSeconds";
import { subtractSeconds } from "../helpers/subtractSeconds";
import { BestStationResult } from "../../shared/BestStationResult";
import { TravelMode} from "../googleMaps/buildDistanceMatrixQuery";
import { StationDataWithBicycling } from "../../shared/StationDataWithBicycling";
import { ReservationType } from "../../shared/ReservationType";
import { SearchQuery } from "../../shared/SearchQuery";


export const findBestStation = async (
    searchQuery: SearchQuery,
    stationsPromise: Promise<StationDataWithWalking[]>,
    queryTime: Date,
    location: LatLng,
    travelMode: TravelMode,
    type: ReservationType): Promise<BestStationResult> => {

    let nearestStations = await stationsPromise;
    let found = false;

    while (nearestStations && !found) {
        // get top station from the queue
        const currentStation = nearestStations.shift();
        if (!currentStation) break;

        // get correct distance matrix value depending on travel mode
        let distanceMatrixResult: DistanceMatrixResultRow;
        if (travelMode === 'walking') {
            distanceMatrixResult = currentStation.walkingDistanceMatrixResult as SuccessRow
        } else if (travelMode === 'bicycling') {
            distanceMatrixResult = (currentStation as StationDataWithBicycling).bicyclingDistanceMatrixResult as SuccessRow;
        } else {
            throw new Error("invalid distance matrix ")
        }
        if (!distanceMatrixResult.duration) {
            throw new Error("distance matrix result value not present");
        }

        // get events for that station from the database
        const events = (await getEventsByStationId(currentStation.stationData.id)) as ReservationEvent[];

        // get the time of the proposed reservation
        const reservationTime: Date = searchQuery.timeTarget === 'Depart at'
            ? addSeconds(queryTime, distanceMatrixResult.duration.value)
            : subtractSeconds(queryTime, distanceMatrixResult.duration.value);


        console.log("\n\n");
        console.log(reservationTime);
        console.log("\n\n");
        // build query
        const stationQuery: ReservationQuery = {
            type,
            time: reservationTime,
            stationId: currentStation.stationData.id
        };

        // test availability
        // TODO: I think there's a redundancy, both query and reservationTime are passed in as parameters
        const availability = await isReservationAvailable(
            reservationTime,
            currentStation.stationData,
            stationQuery,
            events
        );

        if (availability && availability.result) {
            return {
                station: currentStation,
                reservationTime,
                availability
            };
        }
    }
    // if we got this far then there is a problem
    throw new Error("no nearby stations available at this time")
    // TODO: throw error with specific location (origin or destination) rather than not specified
};