import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API WATCH BRASIL",
      version: "1.0.0",
      description: "Documentação da API WATCH BRASIL",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Utilize o token JWT para autenticação",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/Interface/Routes/*.ts"],
  servers: [
    {
      url: "http://localhost:5005/api",
      description: "Servidor local",
    },
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app: any) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export { setupSwagger };
