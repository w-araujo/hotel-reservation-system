import express from "express";
import { routes } from "./routes/index";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

export default app;
