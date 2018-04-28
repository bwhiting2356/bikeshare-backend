import { ReservationType } from "../../shared/ReservationType";

export const MAX_COST = -1;
export const MAX_PAYOUT = 3;
const RANGE = MAX_PAYOUT - MAX_COST;

export const calculateReservationPrice = (
    value: number,
    capacity: number,
    reservationType: ReservationType): number => {

    const incrementSize = RANGE / (capacity - 1);
    const incrementCount = reservationType === 'pickup'
        ? capacity - value
        : value;

    const fullDecimalValue = MAX_PAYOUT - (incrementCount * incrementSize);
    return parseFloat(fullDecimalValue.toFixed(2));
};