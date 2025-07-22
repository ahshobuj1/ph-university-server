import { z } from 'zod';
import { Blood, Gender } from './admin.constant';

const adminNameValidation = z.object({
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

const createAdminValidation = z.object({
  password: z.string().optional(),
  admin: z.object({
    designation: z.string(),
    name: adminNameValidation,
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string(),
    email: z.string(),
    contact: z.string(),
    emergencyContact: z.string(),
    profileImage: z.string().optional(),
    localAddress: z.string(),
    permanentAddress: z.string(),
    blood: z.enum([...Blood] as [string, ...string[]]).optional(),
  }),
});

const updateAdminNameValidation = z
  .object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      })
      .optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .partial();

const updateAdminValidation = z
  .object({
    admin: z
      .object({
        designation: z.string().optional(),
        name: updateAdminNameValidation.optional(),
        gender: z.enum([...Gender] as [string, ...string[]]).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contact: z.string().optional(),
        emergencyContact: z.string().optional(),
        localAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        profileImage: z.string().optional(),
        blood: z.enum([...Blood] as [string, ...string[]]).optional(),
        isDeleted: z.boolean().optional(),
      })
      .partial(),
  })
  .partial();

export const adminValidations = {
  createAdminValidation,
  updateAdminValidation,
};
