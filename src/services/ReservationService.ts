import { IReservationMethods } from "../@types/Reservation";
import { Reservation } from "@prisma/client";
import { prisma } from "../prisma/utils/client";

class ReservationService implements IReservationMethods {
  async create(
    hotelName: string,
    roomNumber: string,
    value: number,
    startDate: Date,
    endDate: Date,
    guestId: number
  ): Promise<Reservation> {
    const startDateWithTime = new Date(startDate);
    const endDateWithTime = new Date(endDate);

    const conflictingReservation = await prisma.reservation.findFirst({
      where: {
        roomNumber: roomNumber,
        OR: [
          {
            startDate: {
              lte: endDateWithTime,
            },
            endDate: {
              gte: startDateWithTime,
            },
          },
        ],
      },
    });

    if (conflictingReservation) {
      throw new Error(
        "There is already a reservation for this room on the selected dates."
      );
    }

    startDateWithTime.setHours(0, 0, 0, 0);
    endDateWithTime.setHours(0, 0, 0, 0);

    startDate = startDateWithTime;
    endDate = endDateWithTime;

    const reservation = await prisma.reservation.create({
      data: {
        hotelName,
        roomNumber,
        value,
        startDate,
        endDate,
        guestId,
      },
    });

    return reservation;
  }
}

export { ReservationService };
