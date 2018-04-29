import { SuccessRow } from "../../shared/DistanceMatrixResultRow";
import { SearchQuery } from "../../shared/SearchQuery";
import { BestStationResult } from "../../shared/BestStationResult";
import { subtractSeconds } from "../helpers/subtractSeconds";

export const calculateDepartureTime = (
    query: SearchQuery,
    stationEndResult: BestStationResult): Date => {

    if (query.timeTarget === 'Depart at') {
        return query.datetime;
    } else if (query.timeTarget === 'Arrive by') {
        return subtractSeconds(
            stationEndResult.reservationTime,
            (stationEndResult.station.walkingDistanceMatrixResult as SuccessRow).duration.value);
    } else {
        throw new Error('Invalid Time Target')
    }
};