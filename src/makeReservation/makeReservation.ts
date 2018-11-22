import { Reservation } from "../../db/models/reservation/Reservation";

const makeReservation = async () => {
    const newReservation = await Reservation.create();
    console.log(newReservation);
};