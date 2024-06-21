import { ILoginMethods, LoginResponse } from "../@types/Session";
import { prisma } from "../prisma/utils/client";
import { comparePassword } from "../utils/password";
import { tokenGenerator } from "../utils/jwt";

class SessionService implements ILoginMethods {
  async login(email: string, password: string): Promise<LoginResponse> {
    const guest = await prisma.guest.findFirst({
      where: { email },
    });

    if (!guest) {
      throw new Error("Guest not found!");
    }

    const isTrue = await comparePassword(password, guest.password);

    if (!isTrue) {
      throw new Error("Incorrect email/password combination");
    }

    delete guest.password;

    const token = tokenGenerator(guest);
    return { token, guest };
  }
}

export { SessionService };
