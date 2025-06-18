import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';
import { Blood, Gender } from './faculty.constant';
import { AppError } from '../../errors/AppError';
import config from '../../config';

const facultyNameSchema = new Schema<TFacultyName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    designation: { type: String, required: true },
    name: facultyNameSchema,
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    gender: { type: String, required: true, enum: Gender },
    dateOfBirth: { type: String, required: true },
    contact: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    localAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, default: config.default_profile_image },
    blood: { type: String, enum: Blood },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

facultySchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const isExistsID = await FacultyModel.findOne({ email: user.email });

  if (isExistsID) {
    throw new AppError(httpStatus.CONFLICT, 'Email already exists');
  }

  next();
});

export const FacultyModel = model<TFaculty>('Faculty', facultySchema);
