import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("warn", "session service");

class SessionValidation {
  async login(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      email: z.string().email().min(1),
      password: z.string().min(7),
    });

    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      logger.error("Erro ao criar a session | Validação -> (session).");

      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { SessionValidation };
