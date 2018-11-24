"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var db_1 = require("../../db");
exports.User = db_1.sequelize.define('user', {
    balance: Sequelize.DECIMAL(2) // TODO: test this
}, {
    timestamps: false
});
//# sourceMappingURL=User.js.map