import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { StaticsStudentModel, TStudent } from './student.interface';
import config from '../../config';

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
  registration: { type: String, required: true },
  roll: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: nameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  matherContact: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  gender: { type: String, required: true, enum: ['male', 'female', 'others'] },
  blood: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  permanentAddress: { type: addressSchema, required: true },
  localAddress: { type: addressSchema, required: true },
  isDeleted: { type: Boolean },
});

// create pre middlewares before save data
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this;

  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// create post middlewares after save data
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
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

// studentSchema.pre('aggregate', async function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

//create a custom statics method,  Add static method BEFORE creating the model
studentSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await StudentModel.findOne({ email });
  return existingUser;
};

export const StudentModel = model<TStudent, StaticsStudentModel>(
  'student',
  studentSchema,
);
