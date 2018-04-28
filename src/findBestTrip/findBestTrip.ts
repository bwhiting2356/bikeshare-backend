import { findClosestStationsByWalkingDistance } from "../findBestStation/findClosestStationsByWalkingDistance";
import { sequelize} from "../../db/db";
import { Station } from "../../db/models/station/Station";
import { mockStations } from "../../db/mockData/mockStations";
import { Reservation } from "../../db/models/reservation/Reservation";
import { mockReservations } from "../../db/mockData/mockReservations";
import { mockEvents } from "../../db/mockData/mockEvents";
import { Event } from "../../db/models/event/Event";
import { SearchQuery } from "../../shared/SearchQuery";
import { findBestStation } from "../findBestStation/findBestStation";
import { fetchAndMergeBicyclingDistance } from "./fetchAndMergeBicyclingDistance";
import { LatLng } from "../../shared/LatLng";
import { getDirections } from "../googleMaps/getDirections";
import { DirectionsQuery } from "../../shared/DirectionsQuery";
import { buildTripData} from "./buildTripData";
import { TripData } from "../../shared/TripData";

export const findBestTrip = async (query: SearchQuery): Promise<TripData> => {
    const originStationsPromise = findClosestStationsByWalkingDistance(query.origin.coords);
    const destinationStationsPromise = findClosestStationsByWalkingDistance(query.destination.coords);

    if (query.timeTarget === 'Depart at') {

        // 1. Find pickup station

        const stationStartPromise = findBestStation(
            originStationsPromise,
            query.datetime,
            query.origin.coords,
            'walking',
            'origin');

        // 2. Get walking 1 detailed directions, save for later

        const walking1DirectionsQuery: DirectionsQuery = {
            origin:  query.origin.coords,
            destination: {
                lat: (await stationStartPromise).station.stationData.lat,
                lng: (await stationStartPromise).station.stationData.lng,
            },
            mode: 'walking'
        };

        const walking1DirectionsPromise = getDirections(walking1DirectionsQuery);
        const mergedStationsWithBicyclingDataPromise =
            fetchAndMergeBicyclingDistance(destinationStationsPromise, stationStartPromise);

        const stationStartLocation: LatLng = {
            lat: (await stationStartPromise).station.stationData.lat,
            lng: (await stationStartPromise).station.stationData.lng
        };

        // 3. Find dropoff station

        const stationEndPromise = findBestStation(
            mergedStationsWithBicyclingDataPromise,
            (await stationStartPromise).reservationTime,
            stationStartLocation,
            'bicycling',
            'destination');

        // 4. Get bicycling detailed directions

        const bicyclingDirectionsQuery: DirectionsQuery = {
            origin:  {
                lat: (await stationStartPromise).station.stationData.lat,
                lng: (await stationStartPromise).station.stationData.lng
            },
            destination: {
                lat: (await stationEndPromise).station.stationData.lat,
                lng: (await stationEndPromise).station.stationData.lng,
            },
            mode: 'bicycling'
        };

        const bicyclingDirectionsPromise = getDirections(bicyclingDirectionsQuery);

        // 5. Get walking 2 detailed directions, save for later

        const walking2DirectionsQuery: DirectionsQuery = {
            origin:  query.origin.coords,
            destination: {
                lat: (await stationEndPromise).station.stationData.lat,
                lng: (await stationEndPromise).station.stationData.lng,
            },
            mode: 'walking'
        };

        const walking2DirectionsPromise = getDirections(walking2DirectionsQuery);

        // 6. bundle all data and return

        return buildTripData(
            query,
            stationStartPromise,
            stationEndPromise,
            walking1DirectionsPromise,
            walking2DirectionsPromise,
            bicyclingDirectionsPromise)

    } else if (query.timeTarget === 'Arrive by') {

        // 1. Find dropoff station first

        const stationEndPromise = findBestStation(
            destinationStationsPromise,
            query.datetime,
            query.destination.coords,
            'walking',
            'destination');

        // 2. Get walking 2 detailed directions, save for later

        const walking2DirectionsQuery: DirectionsQuery = {
            origin:  query.destination.coords,
            destination: {
                lat: (await stationEndPromise).station.stationData.lat,
                lng: (await stationEndPromise).station.stationData.lng,
            },
            mode: 'walking'
        };

        const walking2DirectionsPromise = getDirections(walking2DirectionsQuery);

        const stationEndLoc: LatLng = {
            lat: (await stationEndPromise).station.stationData.lat,
            lng: (await stationEndPromise).station.stationData.lng
        };
        const mergedStationsWithBicyclingDataPromise =
            fetchAndMergeBicyclingDistance(originStationsPromise, stationEndPromise);


        // 3. Find pickup station

        const stationStartPromise = findBestStation(
            mergedStationsWithBicyclingDataPromise,
            (await stationEndPromise).reservationTime,
            stationEndLoc,
            'bicycling',
            'destination');

        // 4. Get bicycling detailed directions

        const bicyclingDirectionsQuery: DirectionsQuery = {
            origin:  {
                lat: (await stationStartPromise).station.stationData.lat,
                lng: (await stationStartPromise).station.stationData.lng
            },
            destination: {
                lat: (await stationEndPromise).station.stationData.lat,
                lng: (await stationEndPromise).station.stationData.lng,
            },
            mode: 'bicycling'
        };

        const bicyclingDirectionsPromise = getDirections(bicyclingDirectionsQuery);

        // 5. Get walking 1 detailed directions, save for later

        const walking1DirectionsQuery: DirectionsQuery = {
            origin:  query.origin.coords,
            destination: {
                lat: (await stationStartPromise).station.stationData.lat,
                lng: (await stationStartPromise).station.stationData.lng,
            },
            mode: 'walking'
        };

        const walking1DirectionsPromise = getDirections(walking1DirectionsQuery);

        // 6. bundle all data and return

        return buildTripData(
            query,
            stationStartPromise,
            stationEndPromise,
            walking1DirectionsPromise,
            walking2DirectionsPromise,
            bicyclingDirectionsPromise)

    } else {
        throw new Error("query timetarget is not valid")
    }
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