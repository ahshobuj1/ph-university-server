import { z } from 'zod';

const createEnrolledCourseValidation = z.object({
  offeredCourse: z.string(),
});

const updateCourseMarksValidation = z.object({
  classTest1: z.number().min(0).max(10).optional(),
  midTerm: z.number().min(0).max(20).optional(),
  classTest2: z.number().min(0).max(10).optional(),
  finalTerm: z.number().min(0).max(50).optional(),
});

const updateEnrolledCourseValidation = z.object({
  semesterRegistration: z.string(),
  offeredCourse: z.string(),
  student: z.string(),
  courseMarks: updateCourseMarksValidation,
});

export const enrolledCourseValidation = {
  createEnrolledCourseValidation,
  updateEnrolledCourseValidation,
};
