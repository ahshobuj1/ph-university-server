import { z } from 'zod';

const loginUserValidation = z.object({
  id: z.string({ required_error: 'Id is required!' }),
  password: z.string({ required_error: 'Password is required!' }),
});

const changeUserPasswordValidation = z.object({
  oldPassword: z.string({ required_error: 'Old password is required!' }),
  newPassword: z.string({ required_error: 'New password is required!' }),
});

export const authValidation = {
  loginUserValidation,
  changeUserPasswordValidation,
};
