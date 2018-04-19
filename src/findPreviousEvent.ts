import { ReservationEvent } from "../shared/ReservationEvent";

/**
 * @param {ReservationEvent[]} events
 * @param {Date} time
 * @returns {ReservationEvent}
 */
export const findPreviousEvent = (events: ReservationEvent[], time: Date) => {
    let prevEvent: ReservationEvent = null;
    events.forEach(event => {
        if (event.time < time) {
            prevEvent = event;
        }
    });
    return prevEvent;
};