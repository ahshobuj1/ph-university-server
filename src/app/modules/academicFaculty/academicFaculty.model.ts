import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AppError } from '../../errors/AppError';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isExistsFaculty = await AcademicFacultyModel.findOne({
    name: this.name,
  });

  if (isExistsFaculty) {
    throw new AppError(httpStatus.CONFLICT, 'Faculty name is already exists');
  }
  next();
});

export const AcademicFacultyModel = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
