import { Request, Response } from "express";
import { ReservationService } from "../services/ReservationService";
import { Reservation } from "@prisma/client";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { WinstonLog } from "../logs/WinstonLog";

const reservationService = new ReservationService();
const logger = new WinstonLog("info", "reservation services");

class ReservationController {
  async create(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/reservation/create) requisitada.");

      await connectPrisma();

      const data: Reservation = req.body;

      //@ts-ignore
      const { id } = req.user;

      const guest = await reservationService.create(
        data.hotelName,
        data.roomNumber,
        Number(data.value),
        data.startDate,
        data.endDate,
        id
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

export { ReservationController };
