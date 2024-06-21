import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("warn", "reservation service");

class ReservationValidation {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      hotelName: z.string().min(1),
      roomNumber: z.string().min(1),
      value: z.number().min(1),
      startDate: z.string().date().min(1),
      endDate: z.string().date().min(1),
    });

    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      logger.error("Erro ao criar o reservation | Validação -> (reservation).");

      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { ReservationValidation };
