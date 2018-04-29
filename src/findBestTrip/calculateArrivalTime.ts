import { SuccessRow } from "../../shared/DistanceMatrixResultRow";
import { addSeconds } from "../helpers/addSeconds";
import { SearchQuery } from "../../shared/SearchQuery";
import { BestStationResult } from "../../shared/BestStationResult";

export const calculateArrivalTime = async (
    query: SearchQuery,
    stationEndResult: Promise<BestStationResult>): Promise<Date> => {

    if (query.timeTarget === 'Depart at') {
        return query.datetime;
    } else if (query.timeTarget === 'Arrive by') {
        return addSeconds(
            (await stationEndResult).reservationTime,
            ((await stationEndResult).station.walkingDistanceMatrixResult as SuccessRow).duration.value);
    } else {
        throw new Error('invalid time target')
    }
};