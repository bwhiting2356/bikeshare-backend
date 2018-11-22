import { SuccessRow } from "../../shared/DistanceMatrixResultRow";
import { SearchQuery } from "../../shared/SearchQuery";
import { BestStationResult } from "../../shared/BestStationResult";
import { addSeconds } from "../helpers/addSeconds";

export const calculateArrivalTime = (
    query: SearchQuery,
    stationEndResult: BestStationResult): Date => {

    if (query.timeTarget === 'Arrive by') {
        return query.datetime;
    } else if (query.timeTarget === 'Depart at') {

        console.log("\n\n\n");
        console.log(stationEndResult.reservationTime);
        console.log((stationEndResult.station.walkingDistanceMatrixResult as SuccessRow).duration.value);
        console.log("\n\n\n");

        return addSeconds(
            stationEndResult.reservationTime,
            (stationEndResult.station.walkingDistanceMatrixResult as SuccessRow).duration.value);
    } else {
        throw new Error('invalid time target')
    }
};