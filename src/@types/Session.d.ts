import { Guest } from "@prisma/client";

interface LoginResponse {
  token: string;
  guest: Guest;
}

export interface ILoginMethods {
  login(email: string, password: string): Promise<LoginResponse>;
}
