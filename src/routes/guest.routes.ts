import { Router } from "express";
import { GuestController } from "../controller/GuestController";
import { GuestValidation } from "../validations/GuestValidation";

const guestRouter = Router();
const guestController = new GuestController();
const guestValidation = new GuestValidation();

/**
 * @swagger
 * tags:
 *   name: Guest
 *   description: Rotas relacionadas aos hóspedes
 */

/**
 * @swagger
 * /guest/create:
 *   post:
 *     tags: [Guest]
 *     summary: Cria um novo hóspede
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Wesley Araujo"
 *               email:
 *                 type: string
 *                 example: "wes@mail.com"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: "2005-06-10"
 *               phone:
 *                 type: string
 *                 example: "00000000000"
 *               password:
 *                 type: string
 *                 example: "1234567"
 *     responses:
 *       201:
 *         description: Retorna o hóspede cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   example: "Wesley Araujo"
 *                 email:
 *                   example: "wes@mail.com"
 *                 birthdate:
 *                   fortmat: date
 *                   example: "2005-06-10T00:00:00.000Z"
 *                 phone:
 *                   example: "00000000000"
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

guestRouter.post("/create", guestValidation.create, guestController.create);

export { guestRouter };
