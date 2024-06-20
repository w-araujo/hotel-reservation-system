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

  async update(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/address/update) requisitada.");

      await connectPrisma();

      const data: Address = req.body;
      const update = await addressService.update(
        Number(req.params.id),
        data.street,
        data.number,
        data.city,
        data.state,
        data.country,
        data.zipCode
      );
      return res.status(200).json(update);
    } catch (error) {
      logger.error("Erro ao atualizar o address | Rota -> (/address/update).");

      return res.status(404).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { AddressController };
