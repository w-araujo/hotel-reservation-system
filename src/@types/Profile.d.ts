import { Reservation } from "@prisma/client";

export interface IProfileMethods {
  selfReservations(guestId: number): Promise<Reservation[]>;
}
