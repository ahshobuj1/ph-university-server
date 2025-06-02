import { z } from 'zod';
import { Days } from './offeredCourse.constant';

// HH:MM -> 00-23: 00-59
const timeStringValidation = z.string().refine(
  (time) => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  },
  {
    message: 'Invalid time format! expected HH:MM in format 24h',
  },
);

const createOfferedCourseValidation = z
  .object({
    academicFaculty: z.string(),
    semesterRegistration: z.string(),
    department: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringValidation,
    endTime: timeStringValidation,
  })
  .refine(
    (data) => {
      const start = `1971-01-01T${data.startTime}`;
      const end = `1971-01-01T${data.endTime}`;

      return end > start;
    },
    {
      message: 'End time must be after Start time',
    },
  );

const updateOfferedCourseValidation = z
  .object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringValidation,
    endTime: timeStringValidation,
  })
  .refine(
    (data) => {
      const start = `1971-01-01T${data.startTime}`;
      const end = `1971-01-01T${data.endTime}`;

      return end > start;
    },
    {
      message: 'End time must be after Start time',
    },
  );

export const offeredCourseValidations = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
};
