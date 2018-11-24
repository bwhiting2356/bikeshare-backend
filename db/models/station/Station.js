"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var db_1 = require("../../db");
var stationAttributes = {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    capacity: Sequelize.INTEGER,
    currentInv: Sequelize.INTEGER,
    address: Sequelize.STRING,
    lat: Sequelize.NUMERIC,
    lng: Sequelize.NUMERIC
};
exports.Station = db_1.sequelize.define("station", stationAttributes, {
    timestamps: false
});
//# sourceMappingURL=Station.js.map