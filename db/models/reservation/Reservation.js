"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../../db");
var Station_1 = require("../station/Station");
var User_1 = require("../user/User");
exports.Reservation = db_1.sequelize.define('reservation', {}, {
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
exports.Reservation.belongsTo(Station_1.Station);
exports.Reservation.belongsTo(User_1.User);
//# sourceMappingURL=Reservation.js.map