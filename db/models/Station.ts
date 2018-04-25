import * as Sequelize from 'sequelize';
import { sequelize, SequelizeAttributes } from "../db";

export interface StationAttributes {
    id: number,
    capacity: number,
    currentInv: number;
    address: string;
    lat: number,
    lng: number;
}

type StationInstance = Sequelize.Instance<StationAttributes> & StationAttributes;

const stationAttributes: SequelizeAttributes<StationAttributes> = {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    capacity: Sequelize.INTEGER,
    currentInv: Sequelize.INTEGER,
    address: Sequelize.STRING,
    lat: Sequelize.NUMERIC,
    lng: Sequelize.NUMERIC
};
export const Station = sequelize.define<StationInstance, StationAttributes>("station", stationAttributes, {
    timestamps: false
});