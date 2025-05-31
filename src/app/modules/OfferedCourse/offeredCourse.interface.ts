import { Types } from 'mongoose';

export type TDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thus' | 'Fri';

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  semester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  department: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};
