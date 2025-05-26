import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, unique: true, required: true },
    prefix: { type: String, trim: true, required: true },
    code: { type: Number, trim: true, required: true },
    credits: { type: Number, trim: true, required: true },
    preRequisiteCourses: { type: [preRequisiteCoursesSchema], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const CourseModel = model<TCourse>('Course', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: Schema.Types.ObjectId,
  faculties: [Schema.Types.ObjectId],
});

export const CourseFacultyModel = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
