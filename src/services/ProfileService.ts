import { IProfileMethods } from "../@types/Profile";
import { Reservation } from "@prisma/client";
import { prisma } from "../prisma/utils/client";

class ProfileService implements IProfileMethods {
  async selfReservations(guestId: number): Promise<Reservation[]> {
    const reservations = await prisma.reservation.findMany({
      where: { guestId },
      include: {
        guest: true,
      },
    });

    if (!reservations) {
      throw new Error("Reservations Error");
    }

    return reservations;
  }
}

export { ProfileService };
