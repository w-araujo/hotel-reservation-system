import { IGuestMethods } from "../@types/Guest";
import { Guest } from "@prisma/client";
import { prisma } from "../prisma/utils/client";
import { hashed } from "../utils/password";

class GuestService implements IGuestMethods {
  async create(
    name: string,
    email: string,
    birthdate: Date,
    phone: string,
    password: string,
    addressId?: number
  ): Promise<Guest> {
    const birthdateWithTime = new Date(birthdate);
    birthdateWithTime.setHours(0, 0, 0, 0);

    const encrypted = await hashed(password);

    const guest = await prisma.guest.create({
      data: {
        name,
        email,
        birthdate: birthdateWithTime,
        phone,
        password: encrypted,
        addressId,
      },
    });

    delete guest.password;
    return guest;
  }
}

export { GuestService };
