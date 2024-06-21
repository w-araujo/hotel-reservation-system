import JWT from "jsonwebtoken";
import { Guest } from "@prisma/client";

const jwtKey = process.env.JWT_SECRET_KEY;

function tokenGenerator(guest: Guest) {
  return JWT.sign(
    {
      id: guest.id,
      name: guest.name,
      email: guest.email,
      role: guest.role,
      addressId: guest.addressId,
    },
    jwtKey,
    {
      expiresIn: "1h",
    }
  );
}

function decode(token: string) {
  return JWT.verify(token, jwtKey);
}

export { tokenGenerator, decode };
