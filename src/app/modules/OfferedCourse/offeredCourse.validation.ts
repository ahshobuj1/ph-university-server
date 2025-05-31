import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidation = z.object({
  academicFaculty: z.string(),
  semesterRegistration: z.string(),
  department: z.string(),
  course: z.string(),
  faculty: z.string(),
  maxCapacity: z.number(),
  section: z.number(),
  days: z.array(z.enum([...Days] as [string, ...string[]])),
  startTime: z.number(),
  endTime: z.string(),
});

export const offeredCourseValidations = {
  createOfferedCourseValidation,
};
