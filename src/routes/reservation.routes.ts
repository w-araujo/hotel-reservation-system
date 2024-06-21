import { Router } from "express";
import { ReservationController } from "../controller/ReservationController";
import { ReservationValidation } from "../validations/ReservationValidation";
import { authorization, authorizeGuest } from "../middlewares/authorization";

const reservationRouter = Router();
const reservationController = new ReservationController();
const reservationValidation = new ReservationValidation();

/**
 * @swagger
 * tags:
 *   name: Reservation
 *   description: Rotas relacionadas as reservas dos hóspedes
 */

/**
 * @swagger
 * /reservation/create:
 *   post:
 *     tags: [Reservation]
 *     summary: Cria uma nova reserva para o próprio hóspede
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelName:
 *                 type: string
 *                 example: "X"
 *               roomNumber:
 *                 type: string
 *                 example: "909"
 *               value:
 *                 type: number
 *                 example: 120.50
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-11"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-12"
 *     responses:
 *       201:
 *         description: Retorna a reserva cadastrada do hóspede
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hotelName:
 *                   example: "X"
 *                 roomNumber:
 *                   format: string
 *                   example: "909"
 *                 value:
 *                   type: number
 *                   example: 120.50
 *                 date:
 *                   format: date-time
 *                   example: "2024-06-10T00:00:00.000Z"
 *                 startDate:
 *                   format: date-time
 *                   example: "2024-06-11T00:00:00.000Z"
 *                 endDate:
 *                   fortmat: date-time
 *                   example: "2024-06-12T00:00:00.000Z"
 *       400:
 *         description: Caso de algum erro inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Expected string, received number"
 */

reservationRouter.post(
  "/create",
  authorization,
  authorizeGuest,
  reservationValidation.create,
  reservationController.create
);

export { reservationRouter };
