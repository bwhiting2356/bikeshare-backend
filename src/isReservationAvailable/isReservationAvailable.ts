import { ReservationQuery } from "../../shared/ReservationQuery";
import { ReservationEvent } from "../../shared/ReservationEvent";
import {findExtremeInventoryEvent} from "./findExtremeInventoryEvent";
import {findPreviousEvent} from "./findPreviousEvent";

interface StationValues {
    capacity: number;
    currentInv: number;
}


export const isReservationAvailable = async (
    currentTime: Date,
    stationData: StationValues,
    reservationQuery: ReservationQuery,
    reservationEvents: ReservationEvent[]) => {

    if (reservationQuery.time < currentTime) {
        throw new Error("Time is in the past");
    }

    const extremeEvent = findExtremeInventoryEvent(reservationQuery, reservationEvents);
    const previousEvent = findPreviousEvent(reservationQuery, reservationEvents);

    if (reservationQuery.type === 'pickup') {
        const value = extremeEvent
            ? extremeEvent.potentialLowInv
            : previousEvent
                ? previousEvent.potentialLowInv
                : stationData.currentInv;
        return value > 0 ?
            { result: true, value } :
            { result: false }

    } else if (reservationQuery.type === 'dropoff') {
        const value = extremeEvent
            ? extremeEvent.potentialHighInv
            : previousEvent
                ? previousEvent.potentialHighInv
                : stationData.currentInv;
        return value < stationData.capacity ?
            { result: true, value } :
            { result: false }
    }


    // if (!reservationEvents.length) {
    //     if (reservationQuery.type === 'pickup') {
    //         if (stationData.currentInv >= 1) {
    //             return {
    //                 result: true,
    //                 values: {
    //                     potentialLowInv: stationData.currentInv,
    //                     potentialHighInv: stationData.currentInv
    //                 }
    //             }
    //         } else {
    //             return { result: false }
    //         }
    //     } else if (reservationQuery.type === 'dropoff') {
    //         if (stationData.currentInv === stationData.capacity) {
    //             return { result: false }
    //         } else {
    //             return {
    //                 result: true,
    //                 values: {
    //                     potentialLowInv: stationData.currentInv,
    //                     potentialHighInv: stationData.currentInv
    //                 }
    //             }
    //         }
    //     }
    // }
};