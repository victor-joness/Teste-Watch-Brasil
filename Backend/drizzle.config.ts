import { defineConfig } from "drizzle-kit";
import { env } from "process";

export default defineConfig({
  schema: "./src/Infrastructure/database/schemas",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://meuuser:minhasenha@localhost:5557/DBWATCH"
  }
});
