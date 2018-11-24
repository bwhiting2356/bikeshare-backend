import { ReservationEvent } from "../../shared/ReservationEvent";

export const findPreviousEvent = (
    time: Date,
    events: ReservationEvent[]): ReservationEvent | null => {
    let prevEvent: ReservationEvent | null = null;

    events.forEach(event => {
        if (event.time < time) {
            prevEvent = event;
        }
    });

    // TODO: should I be using a traditional for loop here so I can break out of it when I find the prev event?
    return prevEvent;
};