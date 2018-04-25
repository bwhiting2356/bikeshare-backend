import * as Sequelize from 'sequelize';

import { sequelize } from "../../db";
import { Reservation } from "../reservation/Reservation";

export const Event = sequelize.define('event', {
    time: Sequelize.DATE,
    potentialHighInv: Sequelize.INTEGER,
    potentialLowInv: Sequelize.INTEGER,

}, {
    timestamps: false
});

Event.belongsTo(Reservation);