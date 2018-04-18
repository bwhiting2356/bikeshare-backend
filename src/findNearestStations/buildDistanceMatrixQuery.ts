import {StationWithDistance} from "../../shared/StationWithDistance";
import {LatLng} from "../../shared/LatLng";
import {DistanceMatixQuery} from "../../shared/DistanceMatrixQuery";

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

const stationsWithRawDistance: StationWithDistance[] = [
    {
        id: '1',
        coords: {
            lat: 40.695756,
            lng: -73.946182
        },
        address: '896 Myrtle Ave',
        distanceFromLoc: 0.17257437339372905
    },
    {
        id: '2',
        coords: {
            lat: 40.696021,
            lng: -73.94352
        },
        address: '248 Throop Ave',
        distanceFromLoc: 0.31194029043889854
    }
];
const location = {
    lat: 40.695884,
    lng: -73.949472
};

// console.log(buildDistanceMatrixQuery(stationsWithRawDistance, location));