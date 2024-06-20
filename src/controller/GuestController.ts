import { Request, Response } from "express";
import { GuestService } from "../services/GuestService";
import { Guest } from "@prisma/client";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { WinstonLog } from "../logs/WinstonLog";

const guestService = new GuestService();
const logger = new WinstonLog("info", "guest services");

class GuestController {
  async create(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/guest/create) requisitada.");

      await connectPrisma();

      const data: Guest = req.body;
      const guest = await guestService.create(
        data.name,
        data.email,
        data.birthdate,
        data.phone,
        data.password,
        data.addressId
      );
      return res.status(201).json(guest);
    } catch (error) {
      logger.error("Erro ao criar o guest | Rota -> (/guest/create).");

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { GuestController };
