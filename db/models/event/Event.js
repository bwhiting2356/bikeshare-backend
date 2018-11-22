"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var db_1 = require("../../db");
var Reservation_1 = require("../reservation/Reservation");
exports.Event = db_1.sequelize.define('event', {
    time: Sequelize.DATE,
    potentialHighInv: Sequelize.INTEGER,
    potentialLowInv: Sequelize.INTEGER,
}, {
    timestamps: false
});
exports.Event.belongsTo(Reservation_1.Reservation);
//# sourceMappingURL=Event.js.map