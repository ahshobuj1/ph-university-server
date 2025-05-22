import { z } from 'zod';
import { Blood, Gender } from './faculty.constant';

const facultyNameValidation = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const createFacultyValidation = z.object({
  password: z.string().optional(),
  faculty: z.object({
    designation: z.string(),
    name: facultyNameValidation,
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string(),
    email: z.string(),
    contact: z.string(),
    emergencyContact: z.string(),
    localAddress: z.string(),
    permanentAddress: z.string(),
    profileImage: z.string(),
    blood: z.enum([...Blood] as [string, ...string[]]),
  }),
});

export const facultyValidations = {
  createFacultyValidation,
};
