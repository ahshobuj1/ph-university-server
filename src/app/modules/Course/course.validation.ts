import { z } from 'zod';

const preRequisiteCoursesValidation = z.object({
  course: z.string().optional(),
});

const createCourseValidation = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.number(),
  credits: z.number(),
  preRequisiteCourses: z.array(preRequisiteCoursesValidation).optional(),
});

const updatePreRequisiteCoursesValidation = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateCourseValidation = z.object({
  title: z.string().optional(),
  prefix: z.string().optional(),
  code: z.number().optional(),
  credits: z.number().optional(),
  preRequisiteCourses: z.array(updatePreRequisiteCoursesValidation).optional(),
});

const FacultyWithCourseValidation = z.object({
  faculties: z.array(z.string()),
});

export const courseValidations = {
  createCourseValidation,
  updateCourseValidation,
  FacultyWithCourseValidation,
};
