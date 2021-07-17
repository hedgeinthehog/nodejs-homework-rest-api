const Joi = require('joi');
const { isValidObjectId } = require('mongoose');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[\d\s\- +()]+$/)
    .min(5)
    .max(15)
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[\d\s\- +()]+$/)
    .min(5)
    .max(15)
    .optional(),
});

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

module.exports.validateCreateContact = (req, _, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateContactId = (req, _, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next({
      status: 404,
      message: 'Not found',
    });
  }
  next();
};
