import { ReservationType } from "../../shared/ReservationType";
import {sequelize} from "../../db/db";

export const transformEvents = async (
    startTime: string,
    endTime: string,
    reservationType: ReservationType) => {

    if (reservationType == 'pickup') {
        await sequelize.query(`
            UPDATE events 
            SET potentialLowInv = potentialLowInv - 1 
            WHERE time >= datetime(\"${startTime}\");
        `);

        await sequelize.query(`
            UPDATE events 
            SET potentialHighInv = potentialHighInv - 1 
            WHERE time >= datetime(\"${endTime}\");
        `);
    } else if (reservationType == 'dropoff') {

        await sequelize.query(`
            UPDATE events 
            SET potentialHighInv = potentialHighInv + 1 
            WHERE time >= datetime(\"${startTime}\");
        `);

        await sequelize.query(`
            UPDATE events 
            SET potentialLowInv = potentialLowInv + 1 
            WHERE time >= datetime(\"${endTime}\");
        `);
    }
};