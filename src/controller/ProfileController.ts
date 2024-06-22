import { Request, Response } from "express";
import { ProfileService } from "../services/ProfileService";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { WinstonLog } from "../logs/WinstonLog";

const profileService = new ProfileService();
const logger = new WinstonLog("info", "profile service");

class ProfileController {
  async selfReservations(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/profile/selfReservations) requisitada.");

      await connectPrisma();

      //@ts-ignore
      const reservations = await profileService.selfReservations(req.user.id);
      return res.status(200).json(reservations);
    } catch (error) {
      logger.error(
        "Erro ao listar as reservations | Rota -> (/profile/selfReservations)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { ProfileController };
