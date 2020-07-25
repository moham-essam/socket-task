import * as Joi from '@hapi/joi';

export const CONFIG_OPTIONS = {
    isGlobal: true,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'testing').default('development'),
        PORT: Joi.number().default(3000),
        REDIS_HOST: Joi.string().default('redis'),
        REDIS_PORT: Joi.number().default(6379),
        BCRYPT_SALT: Joi.string().default('$2b$10$j0ApCRKasvVPFNTuKkiNwO'),
        DB_HOST: Joi.string().default('mysql'),
        DB_PORT: Joi.string().default(3306),
        DB_USERNAME: Joi.string().default('user'),
        DB_PASSWORD: Joi.string().default('password'),
        DB_NAME: Joi.string().default('db'),
        JWT_SECRET: Joi.string().default('secret'),
    }),
};
