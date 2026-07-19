import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  CLIENT_URL: z.string().url(),

  JWT_SECRET: z.string().min(32),

  JWT_EXPIRES_IN: z.string().min(32),
});

export const env = envSchema.parse(process.env);
