import { Request, Response } from "express";
import { SessionService } from "../services/SessionService";
import { Guest } from "@prisma/client";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { WinstonLog } from "../logs/WinstonLog";

const sessionService = new SessionService();
const logger = new WinstonLog("info", "session service");

class SessionController {
  async login(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/session/login) requisitada.");

      await connectPrisma();

      const data: Guest = req.body;
      const sessionGuest = await sessionService.login(
        data.email,
        data.password
      );
      return res.status(200).json(sessionGuest);
    } catch (error) {
      logger.error("Erro ao logar no sistema | Rota -> (/session/login).");

      return res.status(401).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { SessionController };
