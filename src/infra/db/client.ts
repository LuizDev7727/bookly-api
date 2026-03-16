import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env";
import { tables } from "./tables";

export const db = drizzle(env.DATABASE_URL, {
  schema: tables,
  casing: "snake_case",
  logger: env.NODE_ENV === "development",
});
