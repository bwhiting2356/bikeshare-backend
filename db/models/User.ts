import * as Sequelize from 'sequelize';
import {sequelize} from "../db";


export const User = sequelize.define('user', {
    balance: Sequelize.DECIMAL(2) // TODO: test this
}, {
    timestamps: false
});