import { ReservationQuery } from "../../shared/ReservationQuery";
import { ReservationEvent } from "../../shared/ReservationEvent";
import { findExtremeInventoryEvent } from "./findExtremeInventoryEvent";
import { findPreviousEvent } from "./findPreviousEvent";
import { ReservationAvailability } from "../../shared/ReservationAvailability";

interface StationValues {
    capacity: number;
    currentInv: number;
}

// TODO: clean this up... station values?


export const isReservationAvailable = async (
    currentTime: Date,
    stationData: StationValues,
    reservationQuery: ReservationQuery,
    reservationEvents: ReservationEvent[]): Promise<ReservationAvailability> => {

    if (reservationQuery.time < currentTime) {
        throw new Error("Time is in the past");
    }

    const extremeEvent = findExtremeInventoryEvent(reservationQuery, reservationEvents);
    const previousEvent = findPreviousEvent(reservationQuery.time, reservationEvents);

    let result: ReservationAvailability;
    if (reservationQuery.type === 'pickup') {
        const value = extremeEvent
            ? extremeEvent.potentialLowInv
            : previousEvent
                ? previousEvent.potentialLowInv
                : stationData.currentInv;
        result = value > 0
            ? { result: true, value }
            : { result: false }

    } else if (reservationQuery.type === 'dropoff') {
        const value = extremeEvent
            ? extremeEvent.potentialHighInv
            : previousEvent
                ? previousEvent.potentialHighInv
                : stationData.currentInv;
        result = value < stationData.capacity
            ? { result: true, value }
            : { result: false }
    } else {
        throw new Error("reservation query type error")
    }
    return result;
};