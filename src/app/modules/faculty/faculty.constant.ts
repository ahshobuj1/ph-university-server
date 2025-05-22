import { TBlood, TGender } from './faculty.interface';

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

export const searchableFields: string[] = [
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
