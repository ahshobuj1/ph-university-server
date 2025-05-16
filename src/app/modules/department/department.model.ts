import { model, Schema } from 'mongoose';
import { TDepartment } from './department.interface';

const departmentSchema = new Schema<TDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

departmentSchema.pre('save', async function (next) {
  const isExistsDepartment = await DepartmentModel.findOne({ name: this.name });

  if (isExistsDepartment) {
    throw new Error('Department is already exists');
  }
  next();
});

export const DepartmentModel = model<TDepartment>(
  'Department',
  departmentSchema,
);
