import { Schema, model } from 'mongoose';
import { StaticsStudentModel, TStudent } from './student.interface';

const nameSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema({
  village: { type: String },
  postOffice: { type: String, required: true },
  policeStation: { type: String, required: true },
  town: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StaticsStudentModel>({
  id: { type: String, unique: true },
  name: { type: nameSchema, required: true },
  email: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, unique: true, ref: 'User' },
  semester: { type: Schema.Types.ObjectId, ref: 'Semester' },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  age: { type: Number, required: true },
  contact: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  matherContact: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'others'] },
  blood: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  permanentAddress: { type: addressSchema, required: true },
  localAddress: { type: addressSchema, required: true },
  isDeleted: { type: Boolean, default: false },
});

//create query middlewares
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//create a custom statics method,  Add static method BEFORE creating the model
studentSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await StudentModel.findOne({ email });
  return existingUser;
};

export const StudentModel = model<TStudent, StaticsStudentModel>(
  'student',
  studentSchema,
);
