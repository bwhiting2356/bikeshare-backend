"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_COST = -1;
exports.MAX_PAYOUT = 3;
var RANGE = exports.MAX_PAYOUT - exports.MAX_COST;
exports.calculateReservationPrice = function (value, capacity, reservationType) {
    var incrementSize = RANGE / (capacity - 1);
    var incrementCount = reservationType === 'pickup'
        ? capacity - value
        : value;
    var fullDecimalValue = exports.MAX_PAYOUT - (incrementCount * incrementSize);
    return parseFloat(fullDecimalValue.toFixed(2));
};
//# sourceMappingURL=calculateReservationPrice.js.map