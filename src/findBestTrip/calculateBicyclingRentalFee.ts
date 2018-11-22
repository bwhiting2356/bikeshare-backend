import { toCurrency } from "../helpers/toCurrency";

export const PRICE_PER_MINUTE = 0.15;



export const calculateBicyclingRentalFee = (seconds: number) => {
    // TODO: discounts depending on time of day
    // TODO: discounts depending on weather forecast
    return toCurrency(Math.ceil(seconds / 60) * PRICE_PER_MINUTE);
};