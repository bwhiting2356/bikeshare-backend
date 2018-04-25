import * as Sequelize from 'sequelize';

import {sequelize, SequelizeAttributes} from "../../db";
import { Station } from "../station/Station";
import { User } from "../user/User";
import {StationAttributes} from "../station/StationAttributes";
import {ReservationAttributes} from "./ReservationAttributes";

export const Reservation = sequelize.define('reservation', {


}, {
    timestamps: false
});


// type ReservationInstance = Sequelize.Instance<ReservationAttributes> & ReservationAttributes;
//
// const reservationAttributes: SequelizeAttributes<ReservationAttributes> = {
//     id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
// };
// export const Reservation = sequelize.define<ReservationInstance, StationAttributes>("reservation", reservationAttributes, {
//     timestamps: false
// });

Reservation.belongsTo(Station);
Reservation.belongsTo(User);