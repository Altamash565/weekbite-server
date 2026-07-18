import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),

  NODE_ENV: z.enum(["development", "production", "test"]),

  CLIENT_URL: z.string(),

  JWT_SECRET: z.string(),

  JWT_EXPIRES_IN: z.string(),
});

export const env = envSchema.parse(process.env);
