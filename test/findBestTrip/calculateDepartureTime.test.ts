import { expect } from 'chai';

import { sequelize } from "../../db/db";
import { Station } from "../../db/models/station/Station";
import { mockStations } from "../../db/mockData/mockStations";
import { Reservation } from "../../db/models/reservation/Reservation";
import { Event } from "../../db/models/event/Event";

import { SearchQuery } from "../../shared/SearchQuery";
import { BestStationResult } from "../../shared/BestStationResult";
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";

import { subtractSeconds } from "../../src/helpers/subtractSeconds";
import { calculateDepartureTime } from "../../src/findBestTrip/calculateDepartureTime";

describe('Calculate Departure Time', function() {
    before(async () => {
        await sequelize.sync({ force: true });
        await Station.bulkCreate(mockStations);
        await Reservation.bulkCreate([]);
        await Event.bulkCreate([]);
    });

    it('should return the query datetime', async () => {
        const query: SearchQuery = {
            origin: {
                coords: {
                    lat: 0,
                    lng: 0
                },
                address: ''
            },
            destination: {
                coords: {
                    lat: 0,
                    lng: 0
                },
                address: ''
            },
            datetime: new Date("2018-04-29T01:00:00.000Z"),
            timeTarget: 'Depart at'
        };

        const distanceMatrixResultRow: DistanceMatrixResultRow = {
            distance: {
                text: '',
                value: 60
            },
            duration: {
                text: '',
                value: 1
            },
            status: 'OK'
        };

        const stationEndResult: BestStationResult = {
            station: {
                walkingDistanceMatrixResult: distanceMatrixResultRow,
                stationData: {
                    id: 2,
                    lat: 40.696021,
                    lng: -73.94352,
                    capacity: 10,
                    currentInv: 0,
                    address: '248 Throop Ave',
                    distanceFromLoc: 0.31194029043889854
                }
            },
            availability: {
                result: true,
                value: 1
            },
            reservationTime: new Date("2018-04-29T01:30:00.000Z"),
        };
        const actualTime = await calculateDepartureTime(query, stationEndResult)
        const expectedTime = new Date("2018-04-29T01:00:00.000Z");
        expect(actualTime).to.deep.equal(expectedTime);
    });

    it('should return the calculated departure time', async () => {
        const query: SearchQuery = {
            origin: {
                coords: {
                    lat: 0,
                    lng: 0
                },
                address: ''
            },
            destination: {
                coords: {
                    lat: 0,
                    lng: 0
                },
                address: ''
            },
            datetime: new Date("2018-04-29T01:00:00.000Z"),
            timeTarget: 'Arrive by'
        };

        const distanceMatrixResultRow: DistanceMatrixResultRow = {
            distance: {
                text: '',
                value: 300
            },
            duration: {
                text: '',
                value: 60
            },
            status: 'OK'
        };

        const stationStartResult: BestStationResult = {
            station: {
                walkingDistanceMatrixResult: distanceMatrixResultRow,
                stationData: {
                    id: 2,
                    lat: 40.696021,
                    lng: -73.94352,
                    capacity: 10,
                    currentInv: 0,
                    address: '248 Throop Ave',
                    distanceFromLoc: 0.31194029043889854
                }
            },
            availability: {
                result: true,
                value: 1
            },
            reservationTime: new Date("2018-04-29T01:30:00.000Z"),
        };
        const actualTime = await calculateDepartureTime(query, stationStartResult);
        const expectedTime = subtractSeconds(new Date("2018-04-29T01:30:00.000Z"), 60);
        expect(actualTime).to.deep.equal(expectedTime);
    })
});