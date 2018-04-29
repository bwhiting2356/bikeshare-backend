import { LatLng } from "./LatLng";

export interface TripData {
    origin: {
        coords: LatLng;
        address: string;
    },
    departureTime: Date;
    walking1Travel: {
        feet: number;
        seconds: number;
        points: LatLng[];
    },
    stationStart: {
        id: number;
        coords: LatLng;
        address: string;
        price: number;
        time: Date;
    },
    bicyclingTravel: {
        feet: number;
        seconds: number;
        points: LatLng[];
        price: number;
    },
    stationEnd: {
        id: number;
        coords: LatLng;
        address: string;
        price: number;
        time: Date;
    },
    walking2Travel: {
        feet: number;
        seconds: number;
        points: LatLng[];
    },
    destination: {
        coords: LatLng;
        address: string;
    },
    arrivalTime: Date;
    status: string;
}