import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import {
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  serviceName: "APIWATCH",
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4317",
  }),
  
  metricReader: new PeriodicExportingMetricReader({
    //@ts-ignore
    exporter: new PrometheusExporter({
      port: 9464,
    }),
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new HttpInstrumentation(),
    new PgInstrumentation(),
  ],
});

let tracingStarted = false;
export const initalizeTracing = async () => {
  if (!tracingStarted) {
    await sdk.start();
  }
};

process.on("beforeExit", async () => {
  if (tracingStarted) {
    await sdk.shutdown();
  }
});
