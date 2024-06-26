import { Router } from "express";
import { addressRouter } from "./address.routes";
import { guestRouter } from "./guest.routes";
import { sessionRouter } from "./session.routes";
import { profileRouter } from "./profile.routes";
import { reservationRouter } from "./reservation.routes";

const routes = Router();

routes.use("/address", addressRouter);
routes.use("/guest", guestRouter);
routes.use("/session", sessionRouter);
routes.use("/profile", profileRouter);
routes.use("/reservation", reservationRouter);

export { routes };
