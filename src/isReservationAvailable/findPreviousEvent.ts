import { ReservationEvent } from "../../shared/ReservationEvent";
import { ReservationQuery } from "../../shared/ReservationQuery";


export const findPreviousEvent = (
    reservationQuery: ReservationQuery,
    events: ReservationEvent[]): ReservationEvent | null => {
    let prevEvent: ReservationEvent | null = null;
    events.forEach(event => {
        if (event.time < reservationQuery.time) {
            prevEvent = event;
        }
    });
    return prevEvent;
};