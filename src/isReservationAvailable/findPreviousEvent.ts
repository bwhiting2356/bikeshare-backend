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

    // TODO: should I be using a traditional for loop here so I can break out of it when I find the prev event?
    return prevEvent;
};