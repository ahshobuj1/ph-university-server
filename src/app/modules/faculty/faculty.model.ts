import { model, Schema } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';
import { Blood, Gender } from './faculty.constant';

const facultyNameSchema = new Schema<TFacultyName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    designation: { type: String, required: true },
    name: facultyNameSchema,
    gender: { type: String, required: true, enum: Gender },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    localAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
    blood: { type: String, enum: Blood },
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
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const FacultyModel = model<TFaculty>('Faculty', facultySchema);

// _id
// id (Generated)
// user
// name
// email
// academicFaculty
// department
// gender
// dateOfBirth
// designation
// blood
// contact
// emergencyContact
// localAddress
// permanentAddress
// profileImage
// isDeleted
