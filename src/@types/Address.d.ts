import { Address } from "@prisma/client";

export interface IAddressMethods {
  create(
    street: string,
    number: string,
    city: string,
    state: string,
    country: string,
    zipCode: string
  ): Promise<Address>;
}
