import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("warn", "address service");

class AddressValidation {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      street: z.string().min(1),
      number: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      country: z.string().min(1),
      zipCode: z.string().min(1),
    });

    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      logger.error("Erro ao criar o address | Validação -> (address).");

      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      street: z.string().optional(),
      number: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    });

    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      logger.error("Erro ao atualizar o address | Validação -> (address).");

      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { AddressValidation };
