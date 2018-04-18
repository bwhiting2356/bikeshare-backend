import { expect } from 'chai';
import { isReservationAvailable } from "../src/isReservationAvailable";
import { ReservationQuery } from "../shared/ReservationQuery";


describe.only('Is Reservation Available', function() {
    it('should throw an error if the date is earlier than now', (done) => {

        const query: ReservationQuery = {
            stationId: 1,
            time: new Date("2016-05-18T18:08:15.114Z"),
            type: 'pickup'
        };

        const stationValues = {
            currentInv: 0,
            capacity: 10
        };

        isReservationAvailable(stationValues, query, [])
            .then(() => {
                done(new Error('Expected method to reject.'))
            })
            .catch((err) => {
                expect(err).to.be.ok;
                done();
            })
            .catch(done);
    });

    it('should return false when the query is pickup station is empty and there are no future dropoffs scheduled', (done) => {

        const query: ReservationQuery = {
            stationId: 1,
            time: new Date("2018-05-18T18:08:15.114Z"),
            type: 'pickup'
        };

        const stationValues = {
            currentInv: 0,
            capacity: 10
        };

        isReservationAvailable(stationValues, query, [])
            .then((result) => {
                expect(result).to.deep.equal({result: false})
                done();
            })
            .catch(done);
    });

    it('should return true when the query is pickup station is has one bike in it and there are no future dropoffs scheduled', (done) => {

        const query: ReservationQuery = {
            stationId: 1,
            time: new Date("2018-05-18T18:08:15.114Z"),
            type: 'pickup'
        };

        const stationValues = {
            currentInv: 1,
            capacity: 10
        };

        isReservationAvailable(stationValues, query, [])
            .then((result) => {
                expect(result).to.deep.equal({
                    result: true,
                    values: {
                        potentialHighInv: 1,
                        potentialLowInv: 1
                    }
                });
                done();
            })
            .catch(done);
    });

    it('should return false when the query is dropoff, station is full and it and there are no future pickups scheduled', (done) => {

        const query: ReservationQuery = {
            stationId: 1,
            time: new Date("2018-05-18T18:08:15.114Z"),
            type: 'dropoff'
        };

        const stationValues = {
            currentInv: 10,
            capacity: 10
        };

        isReservationAvailable(stationValues, query, [])
            .then((result) => {
                expect(result).to.deep.equal({
                    result: false,
                });
                done();
            })
            .catch(done);
    });

    it('should return false when the query is dropoff, station is full and it and there are no future pickups scheduled', (done) => {

        const query: ReservationQuery = {
            stationId: 1,
            time: new Date("2018-05-18T18:08:15.114Z"),
            type: 'dropoff'
        };

        const stationValues = {
            currentInv: 10,
            capacity: 10
        };

        isReservationAvailable(stationValues, query, [])
            .then((result) => {
                expect(result).to.deep.equal({
                    result: false,
                });
                done();
            })
            .catch(done);
    });

    it('should return true when the query is dropoff, station is has one spot left and it and there are no future pickups scheduled', (done) => {

        const query: ReservationQuery = {
            stationId: 1,
            time: new Date("2018-05-18T18:08:15.114Z"),
            type: 'dropoff'
        };

        const stationValues = {
            currentInv: 9,
            capacity: 10
        };

        isReservationAvailable(stationValues, query, [])
            .then((result) => {
                expect(result).to.deep.equal({
                    result: true,
                    values: {
                        potentialLowInv: 9,
                        potentialHighInv: 9
                    }
                });
                done();
            })
            .catch(done);
    });
})