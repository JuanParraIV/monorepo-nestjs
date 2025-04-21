import "dotenv/config";
import * as joi from 'joi';

interface EnvVars {
  HOST: string;
  PORT: number;
  DATABASE_URL: string;
  // Add other environment variables here as needed
}
const envsSchema = joi.object({
  HOST: joi.string().required(),
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value

export const envs = {
  host: envVars.HOST,
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
}
