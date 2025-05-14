import { TMonth } from './semester.constant';

export type TSemester = {
  name: 'Autumn' | 'Summer' | 'Fall';
  year: string;
  code: '01' | '02' | '03';
  startMonth: TMonth;
  endMonth: TMonth;
};

export type TSemesterNameCode = {
  Autumn: '01';
  Summer: '02';
  Fall: '03';
};
