import { expect } from 'chai';
import {calculateArrivalTime} from "../../src/findBestTrip/calculateArrivalTime";
import {SearchQuery} from "../../shared/SearchQuery";
import {BestStationResult} from "../../shared/BestStationResult";
import {DistanceMatrixResultRow} from "../../shared/DistanceMatrixResultRow";
import {StationDataWithDistance} from "../../shared/StationDataWithDistance";
import {mockStations} from "../../db/mockData/mockStations";
import {sequelize} from "../../db/db";
import {Station} from "../../db/models/station/Station";
import {Reservation} from "../../db/models/reservation/Reservation";
import {Event} from "../../db/models/event/Event";

describe('Calculate Arrival Time', function() {
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
            timeTarget: 'Arrive by'
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

        const stationEndResult: Promise<BestStationResult> = Promise.resolve({
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
        });
        expect(await calculateArrivalTime(query, stationEndResult)).to.deep.equal(new Date("2018-04-29T01:00:00.000Z"));
    })
});