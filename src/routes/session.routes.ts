import { Router } from "express";
import { SessionController } from "../controller/SessionController";
import { SessionValidation } from "../validations/SessionValidation";

const sessionRouter = Router();
const sessionController = new SessionController();
const sessionValidation = new SessionValidation();

/**
 * @swagger
 * tags:
 *   name: Session
 *   description: Rota relacionada a sessão dos Hóspedes
 */

/**
 * @swagger
 * /session/login:
 *   post:
 *     tags: [Session]
 *     summary: Faz login do hóspede/admin no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "wes@mail.com"
 *               password:
 *                 type: string
 *                 example: "1234567"
 *     responses:
 *       200:
 *         description: Retorna o token e os dados do hóspede
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                 type: string
 *                 example: "00000000000000000000000000000000"
 *                name:
 *                 type: string
 *                 example: "wesley araujo"
 *                email:
 *                 type: string
 *                 example: "wes@mail.com"
 *                birthdate:
 *                 type: string
 *                 format: date
 *                 example: "2000-08-10"
 *               phone:
 *                 type: string
 *                 example: "00000000000"
 *               role:
 *                 type: string
 *                 example: "GUEST"
 *       401:
 *         description: Caso de falha no token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:  "Incorrect email/password combination"
 */
sessionRouter.post("/login", sessionValidation.login, sessionController.login);

export { sessionRouter };
