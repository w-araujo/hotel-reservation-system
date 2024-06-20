import { Router } from "express";
import { addressRouter } from "./address.routes";
import { guestRouter } from "./guest.routes";

const routes = Router();

routes.use("/address", addressRouter);
routes.use("/guest", guestRouter);

export { routes };
