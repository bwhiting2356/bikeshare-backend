import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { LatLng } from "../../shared/LatLng";
import { DistanceMatixQuery } from "../../shared/DistanceMatrixQuery";

export type TravelMode = 'walking' | 'bicycling';

export const buildDistanceMatrixQuery = (
    mode: TravelMode,
    stations: StationDataWithDistance[],
    location: LatLng): DistanceMatixQuery => {
    const stationsCoords: LatLng[] = stations.map(station => {
        return {
            lat: station.lat,
            lng: station.lng
        }
    });

    return {
        origins: [location],
        destinations: stationsCoords,
        mode
    };
};