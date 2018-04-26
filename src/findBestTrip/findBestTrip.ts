import { findClosestStationsByWalkingDistance } from "../findNearestStation/findClosestStationsByWalkingDistance";
import { sequelize} from "../../db/db";
import { Station } from "../../db/models/station/Station";
import { mockStations } from "../../db/mockData/mockStations";
import { Reservation } from "../../db/models/reservation/Reservation";
import { mockReservations } from "../../db/mockData/mockReservations";
import { mockEvents } from "../../db/mockData/mockEvents";
import { Event } from "../../db/models/event/Event";
import { SearchQuery } from "../../shared/SearchQuery";
import { findBestStation } from "../findNearestStation/findBestStation";
import {buildDistanceMatrixQuery} from "../googleMaps/buildDistanceMatrixQuery";
import {LatLng} from "../../shared/LatLng";
import {fetchDistanceMatrix} from "../googleMaps/fetchDistanceMatrix";
import {mergeBicyclingDistanceMatrixResultWithStations} from "./mergeBicyclingDistanceMatrixResultWithStations";

export const findBestTrip = async (query: SearchQuery) => {
    // find closest stations to origin as the crow flies
    // find closest stations to origin by walking distance
    const originStationsPromise = findClosestStationsByWalkingDistance(query.origin.coords);

    // find closest stations to destination as the crow files
    // find closest stations to destination by walking distance
    const destinationStationsPromise = findClosestStationsByWalkingDistance(query.destination.coords);

    if (query.timeTarget === 'Depart at') {
        // find ideal start station:
            // * take list of stations, with their distances from location
            // * test to see if they're available at that time
        const stationStart = await findBestStation(
            originStationsPromise,
            query.datetime,
            query.origin.coords,
            'origin');


        const destinationStations = (await destinationStationsPromise)
            .map(station => station.stationData);
        const stationLoc: LatLng = {
            lat: stationStart.station.stationData.lat,
            lng: stationStart.station.stationData.lng
        };
        const distanceMatrixQuery = buildDistanceMatrixQuery('bicycling', destinationStations, stationLoc);
        const results = await fetchDistanceMatrix(distanceMatrixQuery);
        const merged = mergeBicyclingDistanceMatrixResultWithStations(results, await destinationStationsPromise);
        console.log("distance matrix results merged: ", merged);
        // get bicycle distance matrix from that station at that time to all destination stations
        // find ideal destination station:
            // * available at that time
            // * shortest walking distance
    }

    if (query.timeTarget === 'Arrive by') {
        // find ideal destination station:
            // * available at that time
            // * shortest walking distance
        const stationEnd = await findBestStation(
            destinationStationsPromise,
            query.datetime,
            query.destination.coords,
            'destination');

        // get bicycle distance matrix from that station at that time to all origin stations
        // find ideal origin station:
            // * available at that time
            // * shortest walking distance
    }


    // const nearestDestinationStation =



};

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
        } catch(err) {
            console.log(err);
        }
    });