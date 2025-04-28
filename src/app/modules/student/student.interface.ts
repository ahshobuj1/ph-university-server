export type Student = {
  registration: string;
  roll: string;
  name: UserName;
  email: string;
  gender: 'male' | 'female' | 'others';
  age: number;
  motherName: string;
  fatherName: string;
  matherContact: string;
  fatherContact: string;
  contact: string;
  blood: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  permanentAddress: UserAddress;
  localAddress: UserAddress;
  isActive: 'active' | 'blocked';
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type UserAddress = {
  village?: string;
  postOffice: string;
  policeStation: string;
  town: string;
};
