import { Types } from 'mongoose';

export type TFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGender = 'male' | 'female' | 'others';

export type TBlood = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TFacultyName;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contact: string;
  emergencyContact: string;
  localAddress: string;
  permanentAddress: string;
  profileImage: string;
  blood?: TBlood;
  academicFaculty: Types.ObjectId;
  department: Types.ObjectId;
  isDeleted?: boolean;
};
