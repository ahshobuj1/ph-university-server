import { z } from 'zod';

const createEnrolledCourseValidation = z.object({
  offeredCourse: z.string(),
});

export const enrolledCourseValidation = {
  createEnrolledCourseValidation,
};
