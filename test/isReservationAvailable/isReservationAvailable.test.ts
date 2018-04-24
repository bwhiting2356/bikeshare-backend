import { expect } from 'chai';
import { isReservationAvailable } from "../../src/isReservationAvailable/isReservationAvailable";
import { ReservationQuery } from "../../shared/ReservationQuery";
import {ReservationEvent} from "../../shared/ReservationEvent";

describe('Is Reservation Available\n', function() {

    describe('Invalid request:', () => {

        it(`should throw an error: 
        * query time is earlier than the present\n`,
            async () => {

                const query: ReservationQuery = {
                    stationId: 1,
                    time: new Date("2016-05-18T18:08:15.114Z"),
                    type: 'pickup'
                };

                const stationValues = {
                    currentInv: 0,
                    capacity: 10
                };

                const currentTime = new Date("2018-04-18T23:41:15.491Z");

                try {
                    await isReservationAvailable(currentTime, stationValues, query, [])
                } catch(err) {
                    expect(err).to.be.ok;
                }
            });
    });

    describe('No future reservations:', () => {

        it(`should return false: 
        * query type is pickup 
        * station is empty
        * there are no future dropoffs scheduled\n`,
            async () => {

                const query: ReservationQuery = {
                    stationId: 1,
                    time: new Date("2018-05-18T18:08:15.114Z"),
                    type: 'pickup'
                };

                const stationValues = {
                    currentInv: 0,
                    capacity: 10
                };

                const currentTime = new Date("2018-04-18T23:41:15.491Z");
                const result = await isReservationAvailable(currentTime, stationValues, query, []);
                expect(result).to.deep.equal({result: false});
            });

        it(`should return true: 
        * query type is pickup 
        * station has one bike in it
        * no future dropoffs scheduled\n`,
            async () => {

                const query: ReservationQuery = {
                    stationId: 1,
                    time: new Date("2018-05-18T18:08:15.114Z"),
                    type: 'pickup'
                };

                const stationValues = {
                    currentInv: 1,
                    capacity: 10
                };

                const currentTime = new Date("2018-04-18T23:41:15.491Z");
                const result = await isReservationAvailable(currentTime, stationValues, query, []);
                expect(result).to.deep.equal({
                    result: true,
                    value: 1
                });
            });

        it(`should return false:
        * query type is dropoff
        * station is full
        * no future pickups scheduled\n`,
            async () => {

            const query: ReservationQuery = {
                stationId: 1,
                time: new Date("2018-05-18T18:08:15.114Z"),
                type: 'dropoff'
            };

            const stationValues = {
                currentInv: 10,
                capacity: 10
            };

            const currentTime = new Date("2018-04-18T23:41:15.491Z");
            const result = await isReservationAvailable(currentTime, stationValues, query, []);
            expect(result).to.deep.equal({
                result: false,
            });
        });

        it(`should return false:
        * query type is dropoff
        * station is full
        * no future pickups scheduled\n`,
            async () => {

            const query: ReservationQuery = {
                stationId: 1,
                time: new Date("2018-05-18T18:08:15.114Z"),
                type: 'dropoff'
            };

            const stationValues = {
                currentInv: 10,
                capacity: 10
            };

            const currentTime = new Date("2018-04-18T23:41:15.491Z");
            const result = await isReservationAvailable(currentTime, stationValues, query, []);
            expect(result).to.deep.equal({
                result: false,
            });
        });

        it(`should return true:
        * query type is dropoff
        * station has one spot left 
        * there are no future pickups scheduled\n`,
            async () => {

            const query: ReservationQuery = {
                stationId: 1,
                time: new Date("2018-05-18T18:08:15.114Z"),
                type: 'dropoff'
            };

            const stationValues = {
                currentInv: 9,
                capacity: 10
            };

            const currentTime = new Date("2018-04-18T23:41:15.491Z");
            const result = await isReservationAvailable(currentTime, stationValues, query, []);
            expect(result).to.deep.equal({
                result: true,
                value: 9
            });
        });
    });

    describe('Future Reservations:', () => {

        it(`should return true:
        * query type is pickup
        * query time is 30 minutes from current time
        * station has zero bikes currently
        * one dropoff reservation 5 minutes now\n`,
            async () => {

            const currentTime = new Date("2018-04-18T00:00:00.491Z");

            const query: ReservationQuery = {
                stationId: 1,
                time: new Date("2018-04-18T00:30:00.491Z"),
                type: 'pickup'
            };

            const stationValues = {
                currentInv: 0,
                capacity: 10
            };

            const reservationEvents: ReservationEvent[] = [
                {
                    time: new Date("2018-04-18T00:05:00.491Z"),
                    potentialHighInv: 1,
                    potentialLowInv: 0
                },
                {
                    time: new Date("2018-04-18T00:15:00.491Z"),
                    potentialHighInv: 1,
                    potentialLowInv: 1
                }
            ];

            const result = await isReservationAvailable(currentTime, stationValues, query, reservationEvents);
            expect(result).to.deep.equal({
                result: true,
                value: 1
            });
        });

        it(`should return false:
        * query is pickup
        * query time is 30 minutes from current time
        * station has one bike in it
        * one pickup reservation 45 minutes from now\n`,
            async () => {

            const currentTime = new Date("2018-04-18T00:00:00.491Z");

            const stationValues = {
                currentInv: 1,
                capacity: 10
            };

            const query: ReservationQuery = {
                stationId: 1,
                time: new Date("2018-04-18T00:30:00.491Z"),
                type: 'pickup'
            };

            const reservationEvents: ReservationEvent[] = [
                {
                    time: new Date("2018-04-18T00:45:00.491Z"),
                    potentialHighInv: 1,
                    potentialLowInv: 0
                },
            ];

            const result = await isReservationAvailable(currentTime, stationValues, query, reservationEvents);
            expect(result).to.deep.equal({
                result: false
            });
        })
    });
});