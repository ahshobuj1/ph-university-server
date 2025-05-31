import { model, Schema } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { Days } from './offeredCourse.constant';

const offeredCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistration',
  },

  semester: {
    type: Schema.Types.ObjectId,
    ref: 'Semester',
  },

  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Department',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Faculty',
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  section: {
    type: Number,
    required: true,
  },
  days: [
    {
      type: String,
      enum: Days,
    },
  ],
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

export const OfferedCourseModel = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
