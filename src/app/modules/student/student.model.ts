import { Schema, model } from 'mongoose';
import { Student } from './student.interface';

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

const studentSchema = new Schema<Student>({
  registration: { type: String, required: true },
  roll: { type: String, required: true },
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
});

export const StudentModel = model<Student>('student', studentSchema);
