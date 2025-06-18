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
    blood: z.enum([...Blood] as [string, ...string[]]).optional(),
  }),
});

const updateFacultyNameValidation = z
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

const updateFacultyValidation = z
  .object({
    faculty: z
      .object({
        designation: z.string().optional(),
        name: updateFacultyNameValidation.optional(),
        gender: z.enum([...Gender] as [string, ...string[]]).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contact: z.string().optional(),
        emergencyContact: z.string().optional(),
        localAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        profileImage: z.string().optional(),
        blood: z.enum([...Blood] as [string, ...string[]]).optional(),
        academicFaculty: z.string().optional(),
        department: z.string().optional(),
        isDeleted: z.boolean().optional(),
      })
      .partial(),
  })
  .partial();

export const facultyValidations = {
  createFacultyValidation,
  updateFacultyValidation,
};
