import { Router } from "express";
import { addressRouter } from "./address.routes";
import { guestRouter } from "./guest.routes";
import { sessionRouter } from "./session.routes";

const routes = Router();

routes.use("/address", addressRouter);
routes.use("/guest", guestRouter);
routes.use("/session", sessionRouter);

export { routes };
