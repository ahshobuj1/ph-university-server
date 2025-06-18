import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: "password can't be more then 20 characters" })
    .min(6, { message: "password can't be less then 6 characters" })
    .optional(),
});

const changedUserStatusValidation = z.object({
  status: z.enum(['in-progress', 'blocked'], {
    invalid_type_error: 'Status must be in-progress | blocked ',
  }),
});

export const userValidation = {
  userValidationSchema,
  changedUserStatusValidation,
};
