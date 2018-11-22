"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPreviousEvent = function (reservationQuery, events) {
    var prevEvent = null;
    events.forEach(function (event) {
        if (event.time < reservationQuery.time) {
            prevEvent = event;
        }
    });
    // TODO: should I be using a traditional for loop here so I can break out of it when I find the prev event?
    return prevEvent;
};
//# sourceMappingURL=findPreviousEvent.js.map