import { z } from 'zod';

const createAcademicFacultyValidation = z.object({
  name: z.string({ required_error: 'Faculty name is required' }),
});

const updateAcademicFacultyValidation = z.object({
  name: z.string({ required_error: 'Faculty name is required' }),
});

export const academicFacultyValidations = {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
};
