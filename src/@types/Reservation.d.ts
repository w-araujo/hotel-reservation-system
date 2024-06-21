import { Reservation } from "@prisma/client";

export interface IReservationMethods {
  create(
    hotelName: string,
    roomNumber: string,
    value: number,
    startDate: Date,
    endDate: Date,
    guestId: number
  ): Promise<Reservation>;
}
