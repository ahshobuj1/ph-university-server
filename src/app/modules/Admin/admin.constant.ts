import { TBlood, TGender } from './admin.interface';

export const Gender: TGender[] = ['male', 'female', 'others'];
export const Blood: TBlood[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const adminSearchableFields: string[] = [
  'id',
  'email',
  'name.firstName',
  'name.lastName',
  'contact',
  'localAddress',
  'permanentAddress',
  'designation',
  'gender',
];
