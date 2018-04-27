import { buildDistanceMatrixQuery } from "../googleMaps/buildDistanceMatrixQuery";
import { mergeBicyclingDistanceMatrixResultWithStations } from "./mergeBicyclingDistanceMatrixResultWithStations";
import { LatLng } from "../../shared/LatLng";
import { fetchDistanceMatrix } from "../googleMaps/fetchDistanceMatrix";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { StationDataWithBicycling } from "../../shared/StationDataWithBicycling";

export const fetchAndMergeBicyclingDistance = async (
    destinationStationsPromise: Promise<StationDataWithWalking[]>,
    station: StationDataWithWalking
): Promise<StationDataWithBicycling[]> => {
    const destinationStationsData = (await destinationStationsPromise)
        .map(station => station.stationData);
    const stationLoc: LatLng = {
        lat: station.stationData.lat,
        lng: station.stationData.lng
    };
    const distanceMatrixQuery = buildDistanceMatrixQuery('bicycling', destinationStationsData, stationLoc);
    const results = await fetchDistanceMatrix(distanceMatrixQuery);
    return mergeBicyclingDistanceMatrixResultWithStations(results, await destinationStationsPromise);
}