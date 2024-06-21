import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("info", "authorization Middleware");

function authorization(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token not found!");
  }

  const [, token] = authHeader.split(" ");

  try {
    logger.info("Middleware -> (authorization) requisitado.");
    const decoded = decode(token);

    //@ts-ignore
    req.user = decoded as {
      id: number;
      name: string;
      email: string;
      role: string;
      addressId: number;
    };

    next();
    return decoded;
  } catch (error) {
    logger.error(
      "Erro na autorização do sistema | Middleware -> (authorization)."
    );
    return res.status(401).json({ error: (error as Error).message });
  }
}

function authorizeRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user = req.user;

    if (!user) {
      logger.error("Usuário não autenticado. | Middleware -> (authorization).");
      return res.status(401).json({ error: "Unauthenticated user" });
    }

    if (user.role !== role) {
      logger.error(`Permissão insuficiente: necessário role ${role}`);
      return res.status(403).json({ error: "Insufficient permission" });
    }

    next();
  };
}

const authorizeGuest = authorizeRole("GUEST");
const authorizeAdmin = authorizeRole("ADMIN");

export { authorization, authorizeGuest, authorizeAdmin };
