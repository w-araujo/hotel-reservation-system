import { Guest } from "@prisma/client";

export interface IGuestMethods {
  create(
    name: string,
    email: string,
    birthdate: Date,
    phone: string,
    password: string,
    addressId?: number
  ): Promise<Guest>;
  update(
    id: number,
    name: string,
    email: string,
    birthdate: Date,
    phone: string,
    password: string
  ): Promise<Guest>;
}
