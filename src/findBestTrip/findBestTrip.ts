import { findClosestStationsByWalkingDistance } from "../findBestStation/findClosestStationsByWalkingDistance";
import { SearchQuery } from "../../shared/SearchQuery";
import { buildTripData} from "./buildTripData";
import { TripData } from "../../shared/TripData";
import { findStations } from "./findStations";
import { buildAndFetchWalkingDirections } from "./buildAndFetchWalkingDirections";
import { buildAndFetchBicyclingDirections } from "./buildAndFetchBicyclingDirections";
import {mockStations} from "../../db/mockData/mockStations";
import {sequelize} from "../../db/db";
import {Reservation} from "../../db/models/reservation/Reservation";
import {Station} from "../../db/models/station/Station";
import {mockReservations} from "../../db/mockData/mockReservations";
import {Event} from "../../db/models/event/Event";
import {mockEvents} from "../../db/mockData/mockEvents";

export const findBestTrip = async (query: SearchQuery): Promise<TripData> => {
    const originStationsPromise = findClosestStationsByWalkingDistance(query.origin.coords);
    const destinationStationsPromise = findClosestStationsByWalkingDistance(query.destination.coords);

    const { stationStartPromise, stationEndPromise } =
        await findStations(query, originStationsPromise, destinationStationsPromise);

    const walking1DirectionsPromise = buildAndFetchWalkingDirections(query.origin.coords, stationStartPromise);
    const walking2DirectionsPromise = buildAndFetchWalkingDirections(query.destination.coords, stationEndPromise);
    const bicyclingDirectionsPromise = buildAndFetchBicyclingDirections(stationStartPromise, stationEndPromise);

    return buildTripData(
        query,
        stationStartPromise,
        stationEndPromise,
        walking1DirectionsPromise,
        walking2DirectionsPromise,
        bicyclingDirectionsPromise)
};

console.log(new Date());
sequelize.sync({force: true})
    .then(async () => {
        await Station.bulkCreate(mockStations);
        await Reservation.bulkCreate(mockReservations);
        await Event.bulkCreate(mockEvents)
    })
    .then(async () => {
        const query: SearchQuery = {
            origin: {
                coords: {
                    lat: 40.695045,
                    lng: -73.952586
                },
                address: ''
            },
            destination: {
                coords: {
                    lat: 40.691464,
                    lng: -73.936879,
                },
                address: ''
            },
            timeTarget: 'Depart at',
            datetime: new Date()
        };

        try {
            const result = await findBestTrip(query)
            console.log(new Date());
            console.log(result);
        } catch(err) {
            console.log(err);
        }
    });