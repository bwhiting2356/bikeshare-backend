import { LatLng } from "./LatLng";

export interface Station {
    id: string;
    address: string;
    coords: LatLng;
}