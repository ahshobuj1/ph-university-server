import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import { TDepartment } from './department.interface';
import { AppError } from '../../errors/AppError';

const departmentSchema = new Schema<TDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// use pre hooks middleware
departmentSchema.pre('save', async function (next) {
  const isExistsDepartment = await DepartmentModel.findOne({ name: this.name });

  if (isExistsDepartment) {
    throw new AppError(httpStatus.CONFLICT, 'Department is already exists');
  }
  next();
});

//use query middleware to check id is exists in the bd
departmentSchema.pre('findOneAndUpdate', async function (next) {
  const id = this.getQuery();
  const isExistsId = await DepartmentModel.findById(id);

  if (!isExistsId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Department does not exists, Insert correct id',
    );
  }
  next();
});

export const DepartmentModel = model<TDepartment>(
  'Department',
  departmentSchema,
);
