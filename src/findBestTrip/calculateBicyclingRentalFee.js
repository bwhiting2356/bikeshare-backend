"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toCurrency_1 = require("../helpers/toCurrency");
exports.PRICE_PER_MINUTE = 0.15;
exports.calculateBicyclingRentalFee = function (seconds) {
    // TODO: discounts depending on time of day
    // TODO: discounts depending on weather forecast
    return toCurrency_1.toCurrency(Math.ceil(seconds / 60) * exports.PRICE_PER_MINUTE);
};
//# sourceMappingURL=calculateBicyclingRentalFee.js.map