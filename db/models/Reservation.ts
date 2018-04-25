import * as Sequelize from 'sequelize';

import { sequelize } from "../db";
import { Station } from "./Station";
import { User } from "./User";

export const Reservation = sequelize.define('reservation', {


}, {
    timestamps: false
});

Reservation.belongsTo(Station);
Reservation.belongsTo(User);