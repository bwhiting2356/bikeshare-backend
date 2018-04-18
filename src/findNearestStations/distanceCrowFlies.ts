import { LatLng } from "../../shared/LatLng";

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

const convertKmToMiles = (km: number): number => {
    return km * 0.621371;
};

export const distanceCrowFlies = (point1: LatLng, point2: LatLng) => {
    if (!point1 || !point2 || !point1.lat || !point1.lng || !point2.lat || !point2.lng) {
        throw new Error("missing points with lat lng arguments")
    }

    const { lat: lat1, lng: lon1 } = point1;
    const { lat: lat2, lng: lon2 } = point2;

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1);
    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return convertKmToMiles(d);
};