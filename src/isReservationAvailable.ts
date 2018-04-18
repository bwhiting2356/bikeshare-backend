import {ReservationType} from "../shared/ReservationType";
import {ReservationQuery} from "../shared/ReservationQuery";

interface ReservationEvent {
    time: Date;
    // reservationId: string;
    potentialHighInv: number;
    potentialLowInv: number;
}

const reservEvents: ReservationEvent[] = [
    {
        time: new Date("2018-05-18T18:08:15.114Z"),
        potentialHighInv: 3,
        potentialLowInv: 2
    }

];

interface StationValues {
    capacity: number;
    currentInv: number;
}

interface ReservationQueryResult {
    result: boolean;
    values?: {
        potentialHighInv: number;
        potentialLowInv: number;
    }
}


export const isReservationAvailable = async (
    stationData: StationValues,
    reservationQuery: ReservationQuery,
    reservationEvents: ReservationEvent[]) => {
    if (reservationQuery.time < new Date()) {
        throw new Error("time is in the past");
    }
    if (!reservationEvents.length) {
        if (reservationQuery.type === 'pickup') {
            if (stationData.currentInv >= 1) {
                return {
                    result: true,
                    values: {
                        potentialLowInv: stationData.currentInv,
                        potentialHighInv: stationData.currentInv
                    }
                }
            } else {
                return { result: false }
            }
        } else if (reservationQuery.type === 'dropoff') {
            if (stationData.currentInv === stationData.capacity) {
                return { result: false }
            } else {
                return {
                    result: true,
                    values: {
                        potentialLowInv: stationData.currentInv,
                        potentialHighInv: stationData.currentInv
                    }
                }
            }
        }
    }
};