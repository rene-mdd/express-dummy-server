const Joi = require("@hapi/joi");

const validation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).trim().required(),

    lastname: Joi.string().min(1).trim().required(),

    age: Joi.number().min(18).required(),

    class: Joi.string().min(3),

    location: Joi.any().allow("BER", "HH", "DUS"),
  });

  const value = schema.validate(req.body);
  if (!value.error) {
    next();
  } else {
    throw new Error(value.error);
  }
};

module.exports = validation;
