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
  email: string;
  name: TFacultyName;
  academicFaculty: Types.ObjectId;
  department: Types.ObjectId;
  gender: TGender;
  dateOfBirth: string;
  contact: string;
  emergencyContact: string;
  localAddress: string;
  permanentAddress: string;
  profileImage: string;
  blood?: TBlood;
  isDeleted?: boolean;
};
