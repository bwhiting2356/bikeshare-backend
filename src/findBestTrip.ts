import { LatLng } from "../shared/LatLng";
import { TimeTarget } from "../shared/TimeTarget";
import { findClosestStationsByTravelDistance } from "./findNearestStation/findClosestStationsByTravelDistance";
import { sequelize} from "../db/db";
import {Station} from "../db/models/station/Station";
import {mockStations} from "../db/mockData/mockStations";
import {Reservation} from "../db/models/reservation/Reservation";
import {mockReservations} from "../db/mockData/mockReservations";
import {mockEvents} from "../db/mockData/mockEvents";
import {Event} from "../db/models/event/Event";
import {isReservationAvailable} from "./isReservationAvailable/isReservationAvailable";

export interface SearchQuery {
    origin: {
        coords: LatLng;
        address: string;
    },
    destination: {
        coords: LatLng;
        address: string;
    },
    timeTarget: TimeTarget;
    datetime: Date;
}

export const findBestTrip = async (query: SearchQuery) => {

    const nearestOriginStations = await findClosestStationsByTravelDistance(query.origin.coords);
    console.log("nearest stations: ", nearestOriginStations);
    let nearestStation;
    for (let i = 0; i < nearestOriginStations.length; i++) {
        console.log(nearestOriginStations[i]);
    }
    return nearestStation



};

sequelize.sync({force: true})
    .then(async () => {
        await Station.bulkCreate(mockStations);
        await Reservation.bulkCreate(mockReservations);
        await Event.bulkCreate(mockEvents)
    })
    .then(async () => {
        // const query: SearchQuery = {
        //     origin: {
        //         coords: {
        //             lat: 40.695045,
        //             lng: -73.952586
        //         },
        //         address: ''
        //     },
        //     destination: {
        //         coords: {
        //             lat: 40.691464,
        //             lng: -73.936879,
        //         },
        //         address: ''
        //     },
        //     timeTarget: 'Depart at',
        //     datetime: new Date()
        // };

        const query: SearchQuery = {
            origin: {
                coords: {
                    lat: 0,
                    lng: 1
                },
                address: ''
            },
            destination: {
                coords: {
                    lat: 1,
                    lng: 1
                },
                address: ''
            },
            timeTarget: 'Depart at',
            datetime: new Date()
        };

        try {
            await findBestTrip(query)
        } catch(err) {
            console.log(err);
        }
    });