// Validate with joi

import Joi from 'joi';

const validateAddress = Joi.object({
  village: Joi.string(),
  postOffice: Joi.string().required(),
  policeStation: Joi.string().required(),
  town: Joi.string().required(),
});

export const studentValidationSchemaWithJoi = Joi.object({
  registration: Joi.string().required(),
  roll: Joi.string().required(),
  name: Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
  }),
  age: Joi.number().required(),
  email: Joi.string().email(),
  contact: Joi.string().required(),
  fatherName: Joi.string().required(),
  motherName: Joi.string().required(),
  fatherContact: Joi.string().required(),
  matherContact: Joi.string().required(),
  isActive: Joi.string()
    .valid('isActive', 'blocked')
    .default('isActive')
    .messages({
      'any.only': 'Status must be either "isActive" or "blocked"',
      'string.empty': 'Status cannot be empty',
    }),
  gender: Joi.string().valid('male', 'female', 'others'),
  blood: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
  permanentAddress: validateAddress,
  localAddress: validateAddress,
});
