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

  async changeStatusCanceled(
    idReservation: number,
    guestId: number
  ): Promise<Reservation> {
    const reservation = await prisma.reservation.findUnique({
      where: { id: idReservation },
    });

    if (!reservation) {
      throw new Error("Reservation not found!");
    }

    if (reservation.guestId !== guestId) {
      throw new Error("You can only cancel your own reservations");
    }

    if (reservation.status !== "CONFIRMED") {
      throw new Error(
        "Only reservations with status CONFIRMED can be CANCELED"
      );
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: idReservation },
      data: { status: "CANCELED" },
    });

    return updatedReservation;
  }

  async changeStatusCheckin(idReservation: number): Promise<Reservation> {
    const reservation = await prisma.reservation.findUnique({
      where: { id: idReservation },
    });

    if (!reservation) {
      throw new Error("Reservation not found!");
    }

    if (reservation.status !== "CONFIRMED") {
      throw new Error("Only reservations with status CONFIRMED can be CHECKIN");
    }

    const currentDate = new Date();
    const reservationStartDate = new Date(reservation.startDate);
    if (currentDate < reservationStartDate) {
      throw new Error("Cannot check in before the reservation start date");
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: idReservation },
      data: { status: "CHECKIN" },
    });

    return updatedReservation;
  }

  async changeStatusCheckout(idReservation: number): Promise<Reservation> {
    const reservation = await prisma.reservation.findUnique({
      where: { id: idReservation },
    });

    if (!reservation) {
      throw new Error("Reservation not found!");
    }

    if (reservation.status !== "CHECKIN") {
      throw new Error("Only reservations with status CHECKIN can be CHECKOUT");
    }

    const currentDate = new Date();
    const reservationEndDate = new Date(reservation.endDate);
    if (currentDate < reservationEndDate) {
      throw new Error("Cannot check out before the reservation end date");
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: idReservation },
      data: { status: "CHECKOUT" },
    });

    return updatedReservation;
  }

  async getReservationsByPeriod(
    startDate: string,
    endDate: string
  ): Promise<Reservation[]> {
    if (!startDate && !endDate) {
      throw new Error("Dates not informed!");
    }

    const startDateWithTime = new Date(startDate);
    const endDateWithTime = new Date(endDate);
    const reservations = await prisma.reservation.findMany({
      where: {
        AND: [
          {
            startDate: {
              lte: endDateWithTime,
            },
          },
          {
            endDate: {
              gte: startDateWithTime,
            },
          },
        ],
      },
      orderBy: {
        startDate: "asc",
      },
      include: {
        guest: true,
      },
    });

    reservations.map((reservation) => {
      delete reservation.guest.password;
    });

    return reservations;
  }
}

export { ReservationService };
