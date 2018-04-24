import { ReservationType } from "./ReservationType";

export interface ReservationQuery {
    type: ReservationType,
    time: Date;
    stationId: number;
}