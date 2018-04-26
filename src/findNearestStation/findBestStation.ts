import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { LatLng } from "../../shared/LatLng";
import { ReservationQuery } from "../../shared/ReservationQuery";
import { isReservationAvailable } from "../isReservationAvailable/isReservationAvailable";

import { getEventsByStationId } from "../isReservationAvailable/getEventsByStationId";

import { ReservationEvent } from "../../shared/ReservationEvent";
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { TripStage } from "../../shared/TripStage";

import { addSeconds } from "../helpers/addSeconds";
import { subtractSeconds } from "../helpers/subtractSeconds";
import { BestStationResult } from "../../shared/BestStationResult";


export const findBestStation = async (
    stationsPromise: Promise<StationDataWithWalking[]>,
    queryTime: Date,
    location: LatLng,
    stage: TripStage): Promise<BestStationResult> => {

    let nearestStations = await stationsPromise;
    let found = false;

    while (nearestStations && !found) {
        const currentStation = nearestStations.shift();

        // check for errors
        if (!currentStation) break;
        const distanceMatrixResult: DistanceMatrixResultRow = currentStation.walkingDistanceMatrixResult;
        if (!distanceMatrixResult.duration) {
            throw new Error("distance matrix result value not present");
        }

        const events = (await getEventsByStationId(currentStation.stationData.id)) as ReservationEvent[];

        // get the time of the proposed reservation
        const reservationTime: Date = stage === 'origin'
            ? addSeconds(queryTime, distanceMatrixResult.duration.value)
            : subtractSeconds(queryTime, distanceMatrixResult.duration.value);

        // build query
        const query: ReservationQuery = {
            type: stage === 'origin' ? 'pickup' : 'dropoff',
            time: reservationTime,
            stationId: currentStation.stationData.id
        };

        // test availability
        // TODO: I think there's a redundancy, both query and reservationTime are passed in as parameters
        const availability = await isReservationAvailable(reservationTime, currentStation.stationData, query, events);
        if (availability && availability.result) {
            return {
                station: currentStation,
                availability
            };
        }
    }
    // if we got this far then there is a problem
    throw new Error("no nearby stations available at this time")
};