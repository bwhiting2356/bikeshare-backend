import * as Sequelize from 'sequelize';

import { sequelize } from "../db";
import { Reservation } from "./Reservation";

export const Event = sequelize.define('event', {
    time: Sequelize.DATE

}, {
    timestamps: false
});

Event.belongsTo(Reservation);