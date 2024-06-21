import { Router } from "express";
import { ReservationController } from "../controller/ReservationController";
import { ReservationValidation } from "../validations/ReservationValidation";
import {
  authorization,
  authorizeAdmin,
  authorizeGuest,
} from "../middlewares/authorization";

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

/**
 * @swagger
 * /reservation/update/changeStatusCanceled/{id}:
 *   patch:
 *     tags: [Reservation]
 *     summary: O hóspede pode atualizar o próprio status da reserva para "CANCELED"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da reserva a ser atualizado
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Retorna a reserva atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 hotelName:
 *                   type: string
 *                 roomNumber:
 *                   type: string
 *                 value:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   enum: [CANCELED]
 *                 guestId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Reserva não encontrada para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Reservation not found!"
 */

reservationRouter.patch(
  "/update/changeStatusCanceled/:id",
  authorization,
  authorizeGuest,
  reservationController.changeStatusCanceled
);

/**
 * @swagger
 * /reservation/update/changeStatusCheckin/{id}:
 *   patch:
 *     tags: [Reservation]
 *     summary: O Administrador pode atualizar o status da reserva para "CHECKIN"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da reserva a ser atualizada
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Retorna a reserva atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 hotelName:
 *                   type: string
 *                 roomNumber:
 *                   type: string
 *                 value:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   enum: [CHECKIN]
 *                 guestId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Reserva não encontrada para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Reservation not found!"
 */

reservationRouter.patch(
  "/update/changeStatusCheckin/:id",
  authorization,
  authorizeAdmin,
  reservationController.changeStatusCheckin
);

/**
 * @swagger
 * /reservation/update/changeStatusCheckout/{id}:
 *   patch:
 *     tags: [Reservation]
 *     summary: O Administrador pode atualizar o status da reserva para "CHECKOUT"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da reserva a ser atualizada
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Retorna a reserva atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 hotelName:
 *                   type: string
 *                 roomNumber:
 *                   type: string
 *                 value:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   enum: [CHECKOUT]
 *                 guestId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Reserva não encontrada para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Reservation not found!"
 */

reservationRouter.patch(
  "/update/changeStatusCheckout/:id",
  authorization,
  authorizeAdmin,
  reservationController.changeStatusCheckout
);

/**
 * @swagger
 * /reservation/getReservationsByPeriod:
 *   get:
 *     tags: [Reservation]
 *     summary: Obtém reservas dentro de um período específico
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Data de início do período para buscar reservas
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Data de término do período para buscar reservas
 *     responses:
 *       200:
 *         description: Retorna a lista de reservas encontradas no período especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   hotelName:
 *                     type: string
 *                   roomNumber:
 *                     type: string
 *                   value:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     enum: [CONFIRMED, CANCELED, CHECKIN, CHECKOUT]
 *                   guestId:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Erro nos parâmetros de entrada (startDate ou endDate ausentes ou inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dates not informed!"
 */

reservationRouter.get(
  "/getReservationsByPeriod",
  authorization,
  authorizeAdmin,
  reservationController.getReservationsByPeriod
);

export { reservationRouter };
