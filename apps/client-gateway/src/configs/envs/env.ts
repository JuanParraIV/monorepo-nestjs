import "dotenv/config";
import Joi from 'joi';


interface EnvVars {
	PORT: number;
	TCP_PRODUCTS_MICROSERVICE_HOST: string;
  TCP_PRODUCTS_MICROSERVICE_PORT: number;
	// Add other environment variables here as needed
}
/**
 * Schema definition for environment variables validation using Joi.
 * 
 * This schema ensures that the required environment variables are present
 * and conform to the expected types. The following environment variables
 * are validated:
 * 
 * - `PORT`: The port number on which the application will run. Must be a number and is required.
 * - `TCP_PRODUCTS_MICROSERVICE_HOST`: The hostname or IP address of the products microservice. Must be a string and is required.
 * - `TCP_PRODUCTS_MICROSERVICE_PORT`: The port number of the products microservice. Must be a number and is required.
 * 
 * Additional environment variables are allowed but not explicitly validated.
 */
const envsSchema = Joi.object({
  PORT: Joi.number().required(),
  TCP_PRODUCTS_MICROSERVICE_HOST: Joi.string().required(),
  TCP_PRODUCTS_MICROSERVICE_PORT: Joi.number().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  const invalidVars = error.details.map(detail => detail.message).join(", ");
  throw new Error(`Config validation error: ${error.message}. Invalid variables: ${invalidVars}`);
}

const envVars: EnvVars = {
  PORT: value.PORT,
  TCP_PRODUCTS_MICROSERVICE_HOST: value.TCP_PRODUCTS_MICROSERVICE_HOST,
  TCP_PRODUCTS_MICROSERVICE_PORT: value.TCP_PRODUCTS_MICROSERVICE_PORT,
};

export const envs = {
  port: envVars.PORT,
  TCPProductsMicroserviceHost: envVars.TCP_PRODUCTS_MICROSERVICE_HOST,
  TCPProductsMicroservicePort: envVars.TCP_PRODUCTS_MICROSERVICE_PORT,
};

