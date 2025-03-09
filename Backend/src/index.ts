import { initalizeTracing } from "./Infrastructure/Monitoring/Tracing/Tracing";
initalizeTracing();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { setupSwagger } from "./Infrastructure/external-services/SwaggerService";
import rateLimit from "express-rate-limit";
import routes from "./Interface/Routes/index";
import promClient from "prom-client";
import serverless from "serverless-http";

dotenv.config();
const app = express();
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Muitas requisições deste IP, tente novamente em 15 minutos",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api", routes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

import { trace, context } from "@opentelemetry/api";

app.get("/metrics", async (req, res) => {
  const span = trace.getSpan(context.active());
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());

  const payload = {
    Payload: req.body,
    message: "Essa é o salvamento de um payload no Jaeger",
    status: req.statusCode,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    referer: req.headers["referer"] || null,
    method: req.method,
    url: req.originalUrl,
  };

  if (span) {
    span.setAttribute("http.response_payload", JSON.stringify(payload));
  }
});

//export const handler = serverless(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api/docs`);
});
