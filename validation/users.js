const Joi = require('joi');

const schemaSignup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter').optional(),
});

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message,
      data: 'Bad request',
    });
  }
  next();
};

module.exports.validateSignup = (req, _, next) => {
  return validate(schemaSignup, req.body, next);
};

module.exports.validateLogin = (req, _, next) => {
  return validate(validateLogin, req.body, next);
};

module.exports.validateSubscription = (req, _, next) => {
  return validate(validateSubscription, req.body, next);
}