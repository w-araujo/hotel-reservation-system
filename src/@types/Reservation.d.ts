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
  changeStatusCanceled(
    idReservation: number,
    guestId: number
  ): Promise<Reservation>;
  changeStatusCheckin(idReservation: number): Promise<Reservation>;
  changeStatusCheckout(idReservation: number): Promise<Reservation>;
  getReservationsByPeriod(
    startDate: string,
    endDate: string
  ): Promise<Reservation[]>;
}
