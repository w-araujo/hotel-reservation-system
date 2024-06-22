import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    info: {
      title: "hotel-reservation-system",
      version: "1.0.0",
      description: "Documentação das rotas da API",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Meu portifólio",
        url: "https://wesleyfa.dev",
      },
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Development server",
      },
    ],
  },
  apis: ["*/routes/**.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec };
