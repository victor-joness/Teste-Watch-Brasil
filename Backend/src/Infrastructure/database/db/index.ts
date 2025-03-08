import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const databaseConfig = {
  maxConnections: 20,
  connectionTimeout: 30000,
  retryAttempts: 3
};

const devConfig = {
  host: "127.0.0.1",
  port: 5557,
  database: "DBWATCH",
  user: "meuuser",
  password: "minhasenha",
  ...databaseConfig,
};

let sql;

try {
  sql = postgres(devConfig);
} catch (error) {
  throw new Error(`Erro ao conectar com o banco. Error: ${error}`);
}

export const db = drizzle(sql);
