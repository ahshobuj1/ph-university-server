import { z } from 'zod';
import { semesterMonthSchema } from './semester.constant';

const createSemesterValidation = z.object({
  name: z.enum(['Autumn', 'Summer', 'Fall']),
  code: z.enum(['01', '02', '03']),
  year: z.string(),
  startMonth: z.enum(semesterMonthSchema as [string, ...string[]]),
  endMonth: z.enum(semesterMonthSchema as [string, ...string[]]),
});

const updateSemesterValidation = z.object({
  name: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
  code: z.enum(['01', '02', '03']).optional(),
  year: z.string().optional(),
  startMonth: z.enum(semesterMonthSchema as [string, ...string[]]).optional(),
  endMonth: z.enum(semesterMonthSchema as [string, ...string[]]).optional(),
});

export const semesterValidations = {
  createSemesterValidation,
  updateSemesterValidation,
};
