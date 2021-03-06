import { LatLng } from "../../shared/LatLng";
import { buildDistanceMatrixQuery } from "../googleMaps/buildDistanceMatrixQuery";
import { fetchDistanceMatrix } from "../googleMaps/fetchDistanceMatrix";
import { getStations } from "./getStations";
import { findClosestStationsByRawDistance } from "./findClosestStationsByRawDistance";
import { mergeWalkingDistanceMatrixResultWithStations } from "./mergeWalkingDistanceMatrixResultWithStations";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";

export const findClosestStationsByWalkingDistance = async (location: LatLng): Promise<StationDataWithWalking[]> => {
    try {
        const stations = await getStations();
        const stationsRawDistance = findClosestStationsByRawDistance(stations, location, 10);
        const distanceMatrixQuery = buildDistanceMatrixQuery('walking', stationsRawDistance, location);
        const results = await fetchDistanceMatrix(distanceMatrixQuery);
        const nearbyStations = await mergeWalkingDistanceMatrixResultWithStations(results, stationsRawDistance);
        if (nearbyStations.length) {
            return nearbyStations;
        } else {
            throw new Error("no nearby stations");
            // TODO: how should I not handle this locally? why is that bad?
        }
    } catch (e) {
        throw new Error(e);
        // TODO: test this error handling
    }



};