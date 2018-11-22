import { sequelize } from "../../db/db";
import { Reservation } from "../../db/models/reservation/Reservation";
import {Event} from "../../db/models/event/Event";

describe.only('Make Reservation', function() {
    before(async () => {
        await sequelize.sync({ force: true });
    });

    it('should create a reservation and correctly adjust inventory events', async () => {

        const reservation: any = await Reservation.create();
        const event = await Event.create({
            potentialHighInv: 1,
            potentialLowInv: 1,
            time: new Date(),
            reservationId: reservation.dataValues.id
        });

        console.log(event);

        // if the reservation is pickup, decrement the lowInv immediately, decrement the highInv ten minutes later
        // if the reservation is dropoff, increment the highInv immediately, increment the lowInv ten minutes later


        /*
        time: Sequelize.DATE,
    potentialHighInv: Sequelize.INTEGER,
    potentialLowInv: Sequelize.INTEGER,
         */


        console.log(reservation.dataValues.id);
    });

});