import { Types } from 'mongoose';

export type TAdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGender = 'male' | 'female' | 'others';

export type TBlood = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TAdminName;
  gender: TGender;
  email: string;
  dateOfBirth: string;
  contact: string;
  emergencyContact: string;
  localAddress: string;
  permanentAddress: string;
  profileImage: string;
  blood?: TBlood;
  isDeleted?: boolean;
};
