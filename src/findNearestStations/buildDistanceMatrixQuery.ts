import { StationWithDistance } from "../../shared/StationWithDistance";
import { LatLng } from "../../shared/LatLng";
import { DistanceMatixQuery } from "../../shared/DistanceMatrixQuery";

export const buildDistanceMatrixQuery = (
    stations: StationWithDistance[],
    location: LatLng): DistanceMatixQuery => {
    const stationsCoords = stations.map(station => station.coords);

    return {
        origins: [location],
        destinations: stationsCoords,
        mode: 'walking'
    };
};