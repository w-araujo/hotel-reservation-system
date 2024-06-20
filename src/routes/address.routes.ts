import { Router } from "express";
import { AddressController } from "../controller/AddressController";
import { AddressValidation } from "../validations/AddressValidation";

const addressRouter = Router();
const addressController = new AddressController();
const addressValidation = new AddressValidation();

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Rotas relacionadas ao endereço dos hóspedes
 */

/**
 * @swagger
 * /address/create:
 *   post:
 *     tags: [Address]
 *     summary: Cria um novo endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: "Rua Y"
 *               number:
 *                 type: string
 *                 example: "9999"
 *               city:
 *                 type: string
 *                 example: "Pelotas"
 *               state:
 *                 type: string
 *                 example: "RS"
 *               country:
 *                 type: string
 *                 example: "Brasil"
 *               zipCode:
 *                 type: string
 *                 example: "00000000"
 *     responses:
 *       201:
 *         description: Retorna o endereço cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 street:
 *                   example: "Nome da Rua"
 *                 number:
 *                   example: "9999"
 *                 city:
 *                   example: "Pelotas"
 *                 state:
 *                   example: "RS"
 *                 country:
 *                   example: "Brasil"
 *                 zipCode:
 *                   example: "00000000"
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

addressRouter.post(
  "/create",
  addressValidation.create,
  addressController.create
);

export { addressRouter };
