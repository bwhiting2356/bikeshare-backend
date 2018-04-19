import { ReservationType } from '../../shared/ReservationType';
import { ReservationEvent } from '../../shared/ReservationEvent';
import {ReservationQuery} from "../../shared/ReservationQuery";


export const findExtremeInventoryEvent = (
    reservationQuery: ReservationQuery,
    events: ReservationEvent[]): ReservationEvent | null => {
    let extremeEvent: ReservationEvent | null= null;

    events.forEach((event: ReservationEvent) => {
        if (reservationQuery.time <= event.time) {
            if (extremeEvent) {
                if (reservationQuery.type === 'pickup') {
                    if (event.potentialLowInv <= extremeEvent.potentialLowInv
                        && event.time >= reservationQuery.time) {
                        extremeEvent = event;
                    }
                } else if (reservationQuery.type === 'dropoff') {
                    if (event.potentialHighInv >= extremeEvent.potentialHighInv
                        && event.time >= reservationQuery.time) {
                        extremeEvent = event;
                    }
                }
            } else {
                extremeEvent = event;
            }
        }
    });

    return extremeEvent;
};
