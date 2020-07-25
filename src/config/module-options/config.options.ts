import * as Joi from '@hapi/joi';

export const CONFIG_OPTIONS = {
    validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'testing').default('development'),
        PORT: Joi.number().default(3000),
        REDIS_HOST: Joi.string().default('redis'),
        REDIS_PORT: Joi.number().default(6379),
    }),
};
