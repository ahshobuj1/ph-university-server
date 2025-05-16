import { z } from 'zod';

const createDepartmentValidation = z.object({
  name: z.string({ required_error: 'Department name is required' }),
});

const updateDepartmentValidation = z.object({
  name: z.string({ required_error: 'Department name is required' }),
});

export const departmentValidations = {
  createDepartmentValidation,
  updateDepartmentValidation,
};
