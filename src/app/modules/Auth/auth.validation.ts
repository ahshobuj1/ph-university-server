import { z } from 'zod';

const loginUserValidation = z.object({
  id: z.string({ required_error: 'Id is required!' }),
  password: z.string({ required_error: 'Password is required!' }),
});

export const authValidation = {
  loginUserValidation,
};
