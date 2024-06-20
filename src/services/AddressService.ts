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
}

export { AddressService };
