import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("warn", "guest service");

class GuestValidation {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      name: z.string().min(1),
      email: z.string().email().min(1),
      birthdate: z.string().date().min(1),
      phone: z.string().min(5),
      password: z.string().min(7),
      addressId: z.number().optional(),
    });

    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      logger.error("Erro ao criar o guest | Validação -> (guest).");

      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { GuestValidation };
