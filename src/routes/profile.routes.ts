import { Router } from "express";
import { ProfileController } from "../controller/ProfileController";
import { authorization, authorizeGuest } from "../middlewares/authorization";

const profileRouter = Router();
const profileController = new ProfileController();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Rota relacionada após logar como hóspede
 */

/**
 * @swagger
 * /profile/selfReservations:
 *   get:
 *     tags: [Profile]
 *     summary: Lista todas as próprias reservas do hóspede
 *     description: Obtém a lista de todas as reservas feitas
 *     responses:
 *       200:
 *         description: Retorna a listagem de todos as reservas feitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *               hotelName:
 *                 type: string
 *               roomNumber:
 *                 type: string
 *               value:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *             example:
 *               - id: 1
 *                 hotelName: X
 *                 roomNumber: 999
 *                 value: 100
 *                 date: 2020-05-01
 *                 startDate: 2020-06-01
 *                 endDate: 2020-06-02
 *                 status: CONFIRMED
 *               - id: 2
 *                 hotelName: X
 *                 roomNumber: 888
 *                 value: 200
 *                 date: 2020-06-01
 *                 startDate: 2020-07-01
 *                 endDate: 2020-06-03
 *                 status: CONFIRMED
 *       400:
 *         description: Caso de algum erro inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:  "Mensagem do erro"
 */
profileRouter.get(
  "/selfReservations",
  authorization,
  authorizeGuest,
  profileController.selfReservations
);

export { profileRouter };
