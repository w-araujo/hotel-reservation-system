import { Request, Response } from "express";
import { AddressService } from "../services/AddressService";
import { Address } from "@prisma/client";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { WinstonLog } from "../logs/WinstonLog";

const addressService = new AddressService();
const logger = new WinstonLog("info", "address services");

class AddressController {
  async create(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/address/create) requisitada.");

      await connectPrisma();

      const data: Address = req.body;
      const address = await addressService.create(
        data.street,
        data.number,
        data.city,
        data.state,
        data.country,
        data.zipCode
      );
      return res.status(201).json(address);
    } catch (error) {
      logger.error("Erro ao criar o address | Rota -> (/address/create).");

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { AddressController };
