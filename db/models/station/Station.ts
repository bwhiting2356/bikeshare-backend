import * as Sequelize from 'sequelize';
import { sequelize, SequelizeAttributes } from "../../db";
import { StationAttributes } from "./StationAttributes";

type StationInstance = Sequelize.Instance<StationAttributes> & StationAttributes;

const stationAttributes: SequelizeAttributes<StationAttributes> = {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    capacity: Sequelize.INTEGER,
    currentInv: Sequelize.INTEGER,
    address: Sequelize.STRING,
    lat: Sequelize.NUMERIC,
    lng: Sequelize.NUMERIC
};
export const Station = sequelize.define<StationInstance, StationAttributes>("station",
    stationAttributes, { timestamps: false });