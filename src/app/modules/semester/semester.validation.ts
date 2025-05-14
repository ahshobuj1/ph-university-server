import { z } from 'zod';
import { semesterMonthSchema } from './semester.constant';

const createSemesterValidation = z.object({
  name: z.enum(['Autumn', 'Summer', 'Fall']),
  code: z.enum(['01', '02', '03']),
  year: z.string(),
  startMonth: z.enum(semesterMonthSchema as [string, ...string[]]),
  endMonth: z.enum(semesterMonthSchema as [string, ...string[]]),
});

export const semesterValidations = {
  createSemesterValidation,
};
