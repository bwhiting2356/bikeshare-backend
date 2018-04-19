import { ReservationEvent } from "../shared/ReservationEvent";
import {ReservationQuery} from "../shared/ReservationQuery";


export const findPreviousEvent = (events: ReservationEvent[], reservationQuery: ReservationQuery) => {
    let prevEvent: ReservationEvent | null = null;
    events.forEach(event => {
        if (event.time < reservationQuery.time) {
            prevEvent = event;
        }
    });
    return prevEvent;
};