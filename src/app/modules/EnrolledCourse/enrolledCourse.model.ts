import { model, Schema } from 'mongoose';
import {
  TEnrolledCourse,
  TEnrolledCourseMarks,
} from './enrolledCourse.interface';
import { Grade } from './enrolledCourse.constant';

const courseMarksSchema = new Schema<TEnrolledCourseMarks>(
  {
    classTest1: { type: Number, min: 0, max: 10, default: 0 },
    midTerm: { type: Number, min: 0, max: 30, default: 0 },
    classTest2: { type: Number, min: 0, max: 10, default: 0 },
    finalTerm: { type: Number, min: 0, max: 40, default: 0 },
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
    },
    semester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      ref: 'OfferedCourse',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    isEnrolled: { type: Boolean, default: false },
    courseMarks: { type: courseMarksSchema, default: {} },
    grade: { type: String, enum: Grade, default: 'NA' },
    gradePoints: { type: Number, min: 0, max: 4, default: 0 },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const EnrolledCurseModel = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);

//   semesterRegistration: Types.ObjectId;
//   academicSemester: Types.ObjectId;
//   academicFaculty: Types.ObjectId;
//   academicDepartment: Types.ObjectId;
//   offeredCourse: Types.ObjectId;
//   course: Types.ObjectId;
//   student: Types.ObjectId;
//   faculty: Types.ObjectId;
//   isEnrolled: boolean;
//   courseMarks: TEnrolledCourseMarks;
//   grade: TGrade;
//   gradePoints: number;
//   isCompleted: boolean;
