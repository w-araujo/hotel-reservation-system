import { IGuestMethods } from "../@types/Guest";
import { Guest } from "@prisma/client";
import { prisma } from "../prisma/utils/client";
import { hashed } from "../utils/password";

import { AddressService } from "./AddressService";

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

    const addressService = new AddressService();

    const address = await addressService.create(
      "Default Street",
      "0",
      "Default City",
      "Default State",
      "Default Country",
      "00000000"
    );

    addressId = address.id;

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

  async update(
    id: number,
    name?: string,
    email?: string,
    birthdate?: Date,
    phone?: string,
    password?: string
  ): Promise<Guest> {
    const guest = await prisma.guest.findFirst({
      where: { id },
    });

    if (!guest) {
      throw new Error("Guest not found!");
    }

    if (birthdate) {
      const birthdateWithTime = new Date(birthdate);
      birthdateWithTime.setHours(0, 0, 0, 0);
      birthdate = birthdateWithTime;
    }

    if (password) {
      const encrypted = await hashed(password);
      password = encrypted;
    }

    const guestUpdated = await prisma.guest.update({
      where: { id },
      data: {
        name,
        email,
        birthdate,
        phone,
        password,
      },
    });

    delete guestUpdated.password;

    return guestUpdated;
  }
}

export { GuestService };
