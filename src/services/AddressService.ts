import { IAddressMethods } from "../@types/Address";
import { Address } from "@prisma/client";
import { prisma } from "../prisma/utils/client";

class AddressService implements IAddressMethods {
  async create(
    street: string,
    number: string,
    city: string,
    state: string,
    country: string,
    zipCode: string
  ): Promise<Address> {
    const address = await prisma.address.create({
      data: {
        street,
        number,
        city,
        state,
        country,
        zipCode,
      },
    });

    return address;
  }

  async update(
    id: number,
    street?: string,
    number?: string,
    city?: string,
    state?: string,
    country?: string,
    zipCode?: string
  ): Promise<Address> {
    const address = await prisma.address.findFirst({
      where: { id },
    });

    if (!address) {
      throw new Error("Address not found!");
    }

    const addressUpdated = await prisma.address.update({
      where: { id },
      data: {
        street,
        number,
        city,
        state,
        country,
        zipCode,
      },
    });

    return addressUpdated;
  }
}

export { AddressService };
