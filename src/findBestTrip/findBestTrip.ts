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
import {getDirections} from "../googleMaps/getDirections";
import {DirectionsQuery} from "../../shared/DirectionsQuery";
// import {buildTripData} from "./buildTripData";
import {BestStationResult} from "../../shared/BestStationResult";

export const findBestTrip = async (query: SearchQuery) => {
    const originStationsPromise = findClosestStationsByWalkingDistance(query.origin.coords);
    const destinationStationsPromise = findClosestStationsByWalkingDistance(query.destination.coords);


    if (query.timeTarget === 'Depart at') {

        let stationStartPromise,
            stationEndPromise,
            walking1DirectionsPromise,
            walking2DirectionsPromise,
            bicyclingDirectionsPromise;

        // find origin station

        stationStartPromise = findBestStation(
            originStationsPromise,
            query.datetime,
            query.origin.coords,
            'walking',
            'origin');

        // get walking 1 detailed directions

        const walking1DirectionsQuery: DirectionsQuery = {
            origin:  query.origin.coords,
            destination: {
                lat: (await stationStartPromise).station.stationData.lat,
                lng: (await stationStartPromise).station.stationData.lng,
            },
            mode: 'walking'
        };

        walking1DirectionsPromise = getDirections(walking1DirectionsQuery);
        const mergedStationsWithBicyclingDataPromise = fetchAndMergeBicyclingDistance(
            destinationStationsPromise,
            (await stationStartPromise).station); // TODO: refactor without await...

        const stationStartLoc: LatLng = {
            lat: (await stationStartPromise).station.stationData.lat,
            lng: (await stationStartPromise).station.stationData.lng
        };

        // find dropoff station

        stationEndPromise = findBestStation(
            mergedStationsWithBicyclingDataPromise,
            (await stationStartPromise).reservationTime,
            stationStartLoc,
            'bicycling',
            'destination');

        // get bicycling detailed directions

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

        bicyclingDirectionsPromise = getDirections(bicyclingDirectionsQuery);


        // get walking 2 detailed directions

        const walking2DirectionsQuery: DirectionsQuery = {
            origin:  query.origin.coords,
            destination: {
                lat: (await stationEndPromise).station.stationData.lat,
                lng: (await stationEndPromise).station.stationData.lng,
            },
            mode: 'walking'
        };

        walking2DirectionsPromise = getDirections(walking2DirectionsQuery);

        // buildTripData(
        //     query,
        //     stationStartPromise,
        //     stationEndPromise,
        //     walking1DirectionsPromise,
        //     walking2DirectionsPromise,
        //     bicyclingDirectionsPromise)

    } else if (query.timeTarget === 'Arrive by') {
        const stationEnd = await findBestStation(
            destinationStationsPromise,
            query.datetime,
            query.destination.coords,
            'walking',
            'destination');

        const stationEndLoc: LatLng = {
            lat: stationEnd.station.stationData.lat,
            lng: stationEnd.station.stationData.lng
        };
        const mergedStationsWithBicyclingDataPromise = fetchAndMergeBicyclingDistance(originStationsPromise, stationEnd.station);

        const stationStart = await findBestStation(
            Promise.resolve(mergedStationsWithBicyclingDataPromise),
            stationEnd.reservationTime,
            stationEndLoc,
            'bicycling',
            'destination');

        // TODO: complete this section, refactor...

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
            await findBestTrip(query)
            console.log(new Date());
        } catch(err) {
            console.log(err);
        }
    });