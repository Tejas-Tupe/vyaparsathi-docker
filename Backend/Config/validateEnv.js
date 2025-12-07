import Joi from 'joi';

function validateEnv() {
  const envSchema = Joi.object({
    PORT: Joi.number().default(8548),

    MongoURL_LOCAL: Joi.string().required(),
    MongoURL: Joi.string().required(),

    JWTSECRET: Joi.string().min(10).required(),

    NODE_ENV: Joi.string().valid('development', 'production').required(),
  }).unknown(true);
  const { error, value } = envSchema.validate(process.env);

  if (error) {
    console.error('\n ENVIRONMENT VARIABLE ERROR:');
    console.error(error.message);
    process.exit(1);
  }

  return value;
}

export default validateEnv;
