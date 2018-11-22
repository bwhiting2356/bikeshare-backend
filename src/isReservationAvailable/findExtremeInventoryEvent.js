"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findExtremeInventoryEvent = function (reservationQuery, events) {
    var extremeEvent = null;
    events.forEach(function (event) {
        if (reservationQuery.time <= event.time) {
            if (extremeEvent) {
                if (reservationQuery.type === 'pickup') {
                    if (event.potentialLowInv <= extremeEvent.potentialLowInv
                        && event.time >= reservationQuery.time) {
                        extremeEvent = event;
                    }
                }
                else if (reservationQuery.type === 'dropoff') {
                    if (event.potentialHighInv >= extremeEvent.potentialHighInv
                        && event.time >= reservationQuery.time) {
                        extremeEvent = event;
                    }
                }
            }
            else {
                extremeEvent = event;
            }
        }
    });
    return extremeEvent;
};
//# sourceMappingURL=findExtremeInventoryEvent.js.map