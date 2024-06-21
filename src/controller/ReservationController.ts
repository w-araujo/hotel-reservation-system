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
      logger.error("Erro ao criar o guest | Rota -> (/reservation/create).");

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async changeStatusCanceled(req: Request, res: Response) {
    try {
      logger.info(
        "Rota -> (/reservation/update/changeStatusCanceled) requisitada."
      );

      await connectPrisma();

      const idReservation = req.params.id;

      //@ts-ignore
      const { id } = req.user;

      const guest = await reservationService.changeStatusCanceled(
        Number(idReservation),
        id
      );
      return res.status(200).json(guest);
    } catch (error) {
      logger.error(
        "Erro ao modificar a reservation | Rota -> (/reservation/update/changeStatusCanceled)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async changeStatusCheckin(req: Request, res: Response) {
    try {
      logger.info(
        "Rota -> (/reservation/update/changeStatusCheckin) requisitada."
      );

      await connectPrisma();

      const idReservation = req.params.id;

      const guest = await reservationService.changeStatusCheckin(
        Number(idReservation)
      );
      return res.status(200).json(guest);
    } catch (error) {
      logger.error(
        "Erro ao modificar a reservation | Rota -> (/reservation/update/changeStatusCheckin)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async changeStatusCheckout(req: Request, res: Response) {
    try {
      logger.info(
        "Rota -> (/reservation/update/changeStatusCheckout) requisitada."
      );

      await connectPrisma();

      const idReservation = req.params.id;

      const guest = await reservationService.changeStatusCheckout(
        Number(idReservation)
      );
      return res.status(200).json(guest);
    } catch (error) {
      logger.error(
        "Erro ao modificar a reservation | Rota -> (/reservation/update/changeStatusCheckout)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async getReservationsByPeriod(req: Request, res: Response) {
    try {
      logger.info(
        "Rota -> (/reservation/getReservationsByPeriod) requisitada."
      );

      await connectPrisma();

      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;

      const getReservations = await reservationService.getReservationsByPeriod(
        startDate,
        endDate
      );
      return res.status(200).json(getReservations);
    } catch (error) {
      logger.error(
        "Erro ao modificar a reservation | Rota -> (/reservation/getReservationsByPeriod)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { ReservationController };
