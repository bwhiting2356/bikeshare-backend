import { StationDataWithWalking } from "./StationDataWithWalking";
import { ReservationAvailability } from "./ReservationAvailability";

export interface BestStationResult {
    station: StationDataWithWalking;
    availability: ReservationAvailability;
    reservationTime: Date
}